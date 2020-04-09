const express = require('express');
const router = express.Router();
const xml = require('xml');
const fs = require('fs');
const covid19ImpactEstimator = require('./function');

router.post('/api/v1/on-covid-19', function (req, res, next) {
  res.send(covid19ImpactEstimator(req.body));
});

router.post('/api/v1/on-covid-19/json', function (req, res, next) {
  res.send(covid19ImpactEstimator(req.body));
});

router.post('/api/v1/on-covid-19/xml', function (req, res, next) {
  const response = covid19ImpactEstimator(req.body);
  let sending = JSON.stringify(response);
  res.set('Content-Type', 'application/xml');
  res.send(xml(sending));
});

router.post('/api/v1/on-covid-19/logs', function (req, res, next) {
  let returnData;
  fs.readFile(
    'test.json',
    'utf8',
    (readFileCallback = (err, data) => {
      if (err) {
        res.send('There was an error');
        console.log(err);
      } else {
        returnData = JSON.parse(data);
      }
      let sending = '';

      returnData.log.forEach((element) => {
        sending += element + '\n';
      });

      res.send(sending);
    })
  );
});

module.exports = router;
