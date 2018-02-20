INTRODUCTION:
=============

This repo is a simple example of how a web api can be implemented using technologies such as node.js, express.js & sequelize.js. 
* This web api allows a front-end application to create jobs (objects) for tradies
* Create tradie records (objects) and then allows assignment of multiple tradies to jobs.
* Finally a particular tradie can be marked as hired for a particular job.
* Only one tradie can be marked as hired.

In order to test or use this repo, please clone it and then follow the instructions below:

NOTES:
======
1. Please install node version 9.5.0 as that is the version this solution has been tested with.

2. do `npm install` to install the packages, the versions are specified in the package.json.

3. Please make sure mysql is installed & accessable with the following details:
- ` name    : 'test',
    user    : 'root',
    password: '123456',
    host    : 'localhost',
    port    : 3306 `

	If require these details can be changed inthe solution from the configuration file: lib/Config/env/development.js
- The application can be run via `node index.js`

4. the application has been tested using `postman` app.

Following steps can be followed via postman to test the endpoint:

Authorization bearer token can be used with any random token such as `cn389ncoiwuencr`.
(authrization is hooked in just to show how it should be done, there is no actual check for it, feel free to introduce a actual check by yourself)

	1. create a couple of jobs via x-www-form-urlencoded or via json payload as follows:

`curl -X POST \
  http://localhost:4000/api/job \
  -H 'Authorization: Bearer cn389ncoiwuencr' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 38e7eff6-9f4f-3f4c-b466-c257e540408b' \
  -d '  {
    "postcode": "2745",
    "category": "plumbing",
    "description": "change sink mixer",
    "customer_name": "jane doe",
    "email": "jane.doe@jane.doe.com",
    "mobile_no": "0421234567",
    "status": "new"
  }'`

	2. You can then get the jobs via get request:
	`http://localhost:4000/api/job?offset=1&limit=2`

	3. Then you can create some tradies with following request:

`curl -X POST \
  http://localhost:4000/api/tradie \
  -H 'Authorization: Bearer cn389ncoiwuencr' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 35654919-7b88-7ef2-4bf6-e02cea935be9' \
  -d '  {
    "name": "spicer",
    "email": "spicer@spicer.com",
    "mobile_no": "0421234567"
  }'`

	4. List tradies as follows:
	`http://localhost:4000/api/tradie?offset=0&limit=2`

	5. Assign tradies to jobs with following post request:

`curl -X POST \
  http://localhost:4000/api/job/2/assigntradie/3 \
  -H 'Authorization: Bearer cn389ncoiwuencr' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: ae1b3194-3016-d866-a091-facef1ab8798'`
	
	6. Get job assignments as follows:

`curl -X GET \
  http://localhost:4000/api/job/1/assignments \
  -H 'Authorization: Bearer cn389ncoiwuencr' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: 71489c51-3b98-fa81-a759-e31bcaa8e764'`

	7. hire a tradie for a particular job via:

`curl -X POST \
  http://localhost:4000/api/job/1/hiretradie/2 \
  -H 'Authorization: Bearer cn389ncoiwuencr' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 6b481fad-59db-e68f-2068-a3b7612f4dae'`


Explanation:
============
1. I have used express.js, sequelize.js, mysql and es6 to some extent for this solution:
2. My most recent experience has been with full stack javascript that is why I selected this solution.
3. Relational schema keeps entities in good coupling, in relation with an ORM such as sequelize.js it can out of the box provide alot of validation which then is not required to implement. For example the Job endpoint only creates a single realtionship of assignment between job and tradie.
4. Sequelize.js is good for relational mapping and models as can be seen in this solution. It is however not as good when it comes to complex queries where either raw queries or a query builder like knex.js can be use. I have done this in the past.

It would make me really happy if this solution would help others understand how web apis can be created.