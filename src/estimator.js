const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, totalHospitalBeds, timeToElapse
  } = data;
  const impact = {};
  const severeImpact = {};
  let time;
  let incomeTime;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  const imCurr = impact.currentlyInfected;
  const sevCur = severeImpact.currentlyInfected;

  if (periodType === 'months') {
    time = Math.floor((timeToElapse * 30) / 3);
  } else if (data.periodType === 'weeks') {
    time = Math.floor((timeToElapse * 7) / 3);
  } else {
    time = Math.floor(timeToElapse / 3);
  }

  impact.infectionsByRequestedTime = Math.trunc(imCurr * 2 ** time);
  severeImpact.infectionsByRequestedTime = Math.trunc(sevCur * 2 ** time);

  const imRT = impact.infectionsByRequestedTime;
  const sevRT = severeImpact.infectionsByRequestedTime;

  impact.severeCasesByRequestedTime = Math.trunc(imRT * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(sevRT * 0.15);

  const imSC = impact.severeCasesByRequestedTime;
  const sevSC = severeImpact.severeCasesByRequestedTime;

  impact.hospitalBedsByRequestedTime = Math.trunc(totalHospitalBeds * 0.35 - imSC);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(totalHospitalBeds * 0.35 - sevSC);

  impact.casesForICUByRequestedTime = Math.trunc(imRT * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(sevRT * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(imRT * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(sevRT * 0.02);

  const income = data.region.avgDailyIncomeInUSD;
  const regPeople = imRT * data.region.avgDailyIncomePopulation;
  const sevPeople = sevRT * data.region.avgDailyIncomePopulation;

  if (periodType === 'months') {
    incomeTime = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    incomeTime = timeToElapse * 7;
  } else {
    incomeTime = timeToElapse;
  }

  const impDollars = regPeople * income * incomeTime;
  const sevDollars = sevPeople * income * incomeTime;

  impact.dollarsInFlight = parseFloat(impDollars.toFixed(2));
  severeImpact.dollarsInFlight = parseFloat(sevDollars.toFixed(2));

  return { data, impact, severeImpact };
};

const myData = {
  region: {
  name: "Africa",
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.72
  },
  periodType: "days",
  timeToElapse: 14,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
  }

// export default covid19ImpactEstimator;

console.log(covid19ImpactEstimator(myData))
