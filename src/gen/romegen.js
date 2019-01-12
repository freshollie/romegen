// Numeral values with exceptions
const NUMERAL_VALUES = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000,
};

const NUMERALS = Object.keys(NUMERAL_VALUES);

// An array of possible values, sorted in reverse
const DECIMALS = Object.values(NUMERAL_VALUES);
DECIMALS.sort((a, b) => b - a);

const DECIMAL_NUMERALS = {};

// Generate the opposite map
NUMERALS.forEach((numeral) => {
  DECIMAL_NUMERALS[NUMERAL_VALUES[numeral]] = numeral;
});


/**
 * Parse the given roman numeral string
 * and convert it to a decimal value
 */
exports.parse = (numeralString) => {
  const numerals = numeralString.split('');

  let accumulator = 0;

  // Keep track of previous numeral to ensure
  // that the string is valid
  let previousNumeral = null;
  let previousValue = Infinity;

  numerals.forEach((numeral) => {
    let value = NUMERAL_VALUES[numeral];

    if (!value) {
      throw new Error('Invalid roman numerals');
    }

    // Manage the case for IV IX ect...
    if (previousValue < value) {
      // If this combination is not possible, throw an error
      if (!NUMERAL_VALUES[previousNumeral + numeral]) {
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

/**
 * Generate a roman numeral string from
 * the given decimal input
 */
exports.generate = (decimalString) => {
  const decimalValue = parseInt(decimalString, 10);
  if (Number.isNaN(decimalValue)) {
    throw new Error('A number must be given');
  }

  if (decimalValue < 1) {
    throw new Error('Cannot convert values less than 1');
  }

  if (decimalValue > 3999) {
    throw new Error('Cannot convert values larger than 3999');
  }

  let accumulator = decimalValue;
  let numeralString = '';

  const checkDecimal = (decimal) => {
    // Check if we can fit
    // this possible decimal into our
    // left over value
    if (decimal <= accumulator) {
      // If we can, we find the numeral representation
      // of the decimal and add it to our string
      numeralString += DECIMAL_NUMERALS[decimal];

      // Taking away the value from the accumulator
      accumulator -= decimal;

      // break to start from the highest
      // decimal again
      return false;
    }

    // break if accumulator is 0
    return accumulator !== 0;
  };

  while (accumulator > 0) {
    // Find the largest possible numeral
    // we can use for what is left on the
    // accumuator
    DECIMALS.every(checkDecimal);
  }

  return numeralString;
};
