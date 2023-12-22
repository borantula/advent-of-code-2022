import { sampleData, data } from './day21-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';
import { log } from 'console';

const getGardenPlots = (matrix: utils.Matrix, plot: utils.Position) =>
  Object.values(utils.getImmediateNeighborsCoordinates(matrix, plot)).filter(
    (p) => {
      if (!p) return false;
      const val = utils.matrixValue(matrix, p);
      return val === '.' || val === 'S';
    },
  ) as utils.Position[];

export function q1() {
  console.time('Execution Time');
  const currentData = data;
  const matrix = pipe(currentData, utils.parseToMatrix);
  const startingCoord: utils.Position = [
    currentData.indexOf('S') % (matrix[0].length - 1),
    Math.floor(currentData.indexOf('S') / matrix[0].length),
  ];

  let plots = new Set<string>();

  let plotsToCheck: utils.Position[] = [startingCoord];

  let steps = 1;
  const endSteps = 64;
  while (steps <= endSteps + 1) {
    const localPlots = new Set<string>();

    const tempPlots: utils.Position[] = [];
    plotsToCheck.forEach((plot) => {
      const key = plot.join('-');
      if (!localPlots.has(key)) {
        const gp = getGardenPlots(matrix, plot);
        // console.log('gp', steps, gp);

        gp.forEach((a) => tempPlots.push(a));

        localPlots.add(key);
      }
    });

    plotsToCheck = tempPlots;
    // console.log('localPlots', steps, localPlots);
    plots = localPlots;
    steps++;
  }

  console.log('Q1', startingCoord, plots.size);
  console.timeEnd('Execution Time');
}

export function q2() {}
