const { Router } = require('express');
const decimal = require('./decimal.js');
const numerals = require('./numerals.js');

const router = Router();

router.get('/', (_, res) => {
  res.send({
    numerals: '/numerals',
    decimal: '/decimal',
  });
});

router.use('/decimal', decimal);
router.use('/numerals', numerals);

router.use((_, res) => {
  res.status(404).send({
    error: 'Not found',
  });
});

module.exports = router;
