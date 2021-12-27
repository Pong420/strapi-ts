import Sequencer from '@jest/test-sequencer';
import { Test } from 'jest-runner';
import { uniqBy } from 'lodash';

/**
 * sort tests order if necessary
 */

function getFilenameFromPath(path: string) {
  return path.split('/').slice(-1)[0].replace(/\..*$/, '');
}

const orders = ['category', 'product'];

export default class CustomSequencer extends Sequencer {
  sort(tests: Test[]) {
    // Test structure information
    // https://github.dev/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21

    const map = tests.reduce((acc, test) => {
      return { ...acc, [getFilenameFromPath(test.path)]: test };
    }, {} as Record<string, Test>);

    const copyTests: Test[] = uniqBy(
      [...orders.map(path => map[path]).filter(Boolean), ...Array.from(tests)],
      test => test.path
    );

    return copyTests;
  }
}
