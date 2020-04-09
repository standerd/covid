const express = require('express');
const router = express.Router();
const xml = require('xml');

const covid19ImpactEstimator = require('./function');

/* GET users listing. */
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
  res.send(xml([{"data" : "hello"}, {"hello" : "hello"}]));
});

router.post('/api/v1/on-covid-19/logs', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
