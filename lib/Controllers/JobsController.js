/* global module, exports:true */

'use strict';

const db = require('../Models');
const util = require('util');
const Helper = require('../Helpers/JobsHelper');
const _ = require('lodash');

exports.index = async function (req, res) {
  try {
    const { offset, limit } = req.query;
    const { Job } = db;
    const result = await Job.findAndCountAll({
      where: {
        isDeleted: false
      },
      offset: offset && +offset || 0,
      limit: limit && +limit || 10
    });

    res.status(200).send({ result: result });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

exports.get = async function (req, res) {
  try {
    const { id } = req.params;
    const { Job } = db;
    const result = await Job.findById(id);
    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

exports.create = async function (req, res, next) {
  try {
    const { validateJob } = new Helper();
    const { Job } = db;
    const {
      postcode,
      category,
      description,
      customer_name,
      email,
      mobile_no,
      status } = req.body;

    if (validateJob({ postcode, category, description, customer_name, email, mobile_no, status })
    ) {
      const job = Job.build({
        PostCode: postcode,
        Category: category.toLowerCase(),
        Description: description.toLowerCase(),
        CustomerName: customer_name.toLowerCase(),
        Email: email.toLowerCase(),
        MobileNo: mobile_no,
        Status: 'new',
        CreatedBy: 'app',
        CreatedOn: Date.now()
      });

      const saved = await job.save();

      res.status(200).send({ message: 'successfully created.' });
    } else {
      res.status(422).send({ message: 'Please provide all correct fields' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

exports.update = function (req, res, next) {
  res.status(500).end();
};

exports.destroy = function (req, res, next) {
  res.status(500).end();
};

exports.assign = async function (req, res) {
  try {
    const { jid, tid } = req.params;
    const { Job, Tradie } = db;
    const job = await Job.findById(jid);
    const tradie = await Tradie.findById(tid);
    if (job && tradie) {
      const result = await job.addTradie(tradie, { Status: 'Assigned' });
      if (result.length > 0) {
        res.status(200).send({ message: 'successfully assigned.' });
      } else {
        res.status(409).send({ message: 'already assigned.' });
      }
    } else {
      res.status(404).send({ message: 'either one of the requested resource not found' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

exports.getAssignments = async function (req, res) {
  try {
    const { id } = req.params;
    const { Job, Tradie } = db;
    const jobWithTradies = await Job.findOne({
      include: [{
        model: Tradie,
        required: true, //Note: forces inner join, default is left outer
        through: {
          where: { Status: 'Assigned' }
        }
      }],
      where: { ID: id }
    });
    if (jobWithTradies) {
      res.send(jobWithTradies);
    } else {
      res.status(404).send({ message: 'job does not have assignements yet' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};


exports.hire = async function (req, res) {
  try {
    const { jid, tid } = req.params;
    const { Job, Tradie, JobTradie } = db;

    const existingRecord = await JobTradie.findOne({ where: { JobID: jid, TradieID: tid } });
    if (!existingRecord) {
      res.status(404).send({ message: 'specified job and tradie are not assigned to each other.' });
    } else {
      const jobWithTradies = await Job.findAll({
        include: [{
          model: Tradie,
          required: true
        }],
        where: { ID: jid }
      });
      let alreadyHired = _.filter(jobWithTradies[0].Tradies, item => {
        return item.JobTradie.Status === 'Hired';
      });

      if (alreadyHired.length > 0) {
        res.status(409).send({ message: 'already assigned.' });
      } else {
        const updated = await existingRecord.update({ Status: 'Hired' }, { fields: ['Status'] });
        if (updated) {
          res.status(200).send({ message: 'successfully hired.' });
        } else {
          res.status(500).send({ message: 'unable to update existing record' });
        }
      }
    }
  } catch (e) {
    res.status(500).send({ message: 'unexpected error occurred' });
  }
};