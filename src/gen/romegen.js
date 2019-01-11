const NUMERAL_INDEX = {
  I: 0,
  V: 1,
  X: 2,
  L: 3,
  C: 4,
  D: 5,
  M: 6,
};

const NUMERAL_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

exports.parse = (numeralString) => {
  const numerals = numeralString.split('');

  let accumulator = 0;

  // Keep track of previous numeral to ensure
  // that the string is valid
  let previousNumeral = null;
  let previousValue = Infinity;

  numerals.forEach((numeral) => {
    let value = NUMERAL_VALUES[numeral];

    // Manage the case for IV IX ect...
    if (previousValue < value) {
      // Cannot be more than 2 behind in index
      if (NUMERAL_INDEX[numeral] - NUMERAL_INDEX[previousNumeral] > 2) {
        throw new Error('Invalid roman numerals');
      }

      accumulator -= previousValue;
      value -= previousValue;
    }

    previousNumeral = numeral;
    previousValue = NUMERAL_VALUES[numeral];

    accumulator += value;

    if (accumulator > 3999) {
      throw new Error('Cannot parse, as value is larger than 3999');
    }
  });

  return accumulator;
};
