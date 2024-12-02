import { sampleData, data } from './day2-data';
import * as utils from '../../utils';
import { take } from 'lodash';

const checkReport = (report: number[]) => {
  const shiftedReport = [...report.slice(1), 0];
  const diffs = report.map((o, i) => shiftedReport[i] - o);
  // we don't need that last one
  diffs.pop();
  const allNegative = diffs.every((d) => d < 0);
  const allPositive = diffs.every((d) => d > 0);
  const isDiffSafe = diffs.every((d) => Math.abs(d) >= 1 && Math.abs(d) <= 3);
  const isDirectionSafe = allNegative || allPositive;
  const isSafe = isDirectionSafe && isDiffSafe;
  return { report, diffs, isSafe };
};

export function q1() {
  const parsed = utils
    .parseLinesToArray(data)
    .map((a) => a.split(' ').map(Number));
  const reports = parsed.map(checkReport).map((a) => a.isSafe);
  const safeReportCount = reports.filter((x) => x).length;
  console.log('Q1', safeReportCount);
}

export function q2() {
  const parsed = utils
    .parseLinesToArray(data)
    .map((a) => a.split(' ').map(Number));
  const reports = parsed.map(checkReport);
  const unsafeReports = reports.filter((x) => !x.isSafe);

  const safeReportCount = reports.filter((x) => x.isSafe).length;

  const newSafeReports: number[][] = [];
  unsafeReports.forEach(({ report }) => {
    for (
      let indexToRemove = 0;
      indexToRemove < report.length;
      indexToRemove++
    ) {
      const newArr = report.filter((_, ind) => ind !== indexToRemove);
      const isSafeNow = checkReport(newArr);

      if (isSafeNow.isSafe) {
        newSafeReports.push(report);
        break;
      }
    }
  });

  console.log('Q2', newSafeReports.length + safeReportCount);
}
