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

  impact.infectionsByRequestedTime = imCurr * 2 ** time;
  severeImpact.infectionsByRequestedTime = sevCur * 2 ** time;

  const imRT = impact.infectionsByRequestedTime;
  const sevRT = severeImpact.infectionsByRequestedTime;

  impact.severeCasesByRequestedTime = imRT * 0.15;
  severeImpact.severeCasesByRequestedTime = sevRT * 0.15;

  const imSC = impact.severeCasesByRequestedTime;
  const sevSC = severeImpact.severeCasesByRequestedTime;

  impact.hospitalBedsByRequestedTime = Math.floor(totalHospitalBeds * 0.35 - imSC);
  severeImpact.hospitalBedsByRequestedTime = Math.floor(totalHospitalBeds * 0.35 - sevSC);

  impact.casesForICUByRequestedTime = imRT * 0.05;
  severeImpact.casesForICUByRequestedTime = sevRT * 0.05;

  impact.casesForVentilatorsByRequestedTime = imRT * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = sevRT * 0.02;

  const income = data.region.avgDailyIncomeInUSD;
  const regPeople = imRT * data.region.avgDailyIncomePopulation;
  const sevPeople = sevRT * data.region.avgDailyIncomePopulation;

  if (data.periodType === 'months') {
    incomeTime = data.timeToElapse * 30;
  } else if (data.periodType === 'weeks') {
    incomeTime = data.timeToElapse * 7;
  } else {
    incomeTime = data.timeToElapse;
  }

  impact.dollarsInFlight = regPeople * income * incomeTime;
  severeImpact.dollarsInFlight = sevPeople * income * incomeTime;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
