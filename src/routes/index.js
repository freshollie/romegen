const { Router } = require('express');
const decimals = require('./decimals.js');
const numerals = require('./numerals.js');

const router = Router();

router.get('/', (_, res) => {
  res.send({
    numerals: '/numerals',
    decimals: '/decimals',
  });
});

router.use('/decimals', decimals);
router.use('/numerals', numerals);

module.exports = router;
