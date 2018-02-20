/* global module, exports:true */

'use strict';

const db = require('../Models');
const util = require('util');
const Helper = require('../Helpers/TradieHelper');

exports.index = async function (req, res) {
  try {
    const { offset, limit } = req.query;
    const { Tradie } = db;
    const result = await Tradie.findAndCountAll({
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

exports.get = function (req, res) {
  res.status(500).end();
};

exports.create = async function (req, res, next) {
  try {
    const { validateTradie } = new Helper();
    const { Tradie } = db;
    const {
      name,
      email,
      mobile_no
    } = req.body;

    if (validateTradie({ name, email, mobile_no })
    ) {
      const tradie = Tradie.build({
        Name: name.toLowerCase(),
        Email: email.toLowerCase(),
        MobileNo: mobile_no,
        IsActive: true,
        CreatedBy: 'app',
        CreatedOn: Date.now()
      });

      const saved = await tradie.save();

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
