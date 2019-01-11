const { Router } = require('express');
const romegen = require('../gen/romegen.js');

const router = Router();

router.get('/', (_, res) => {
  res.status(422).send({ error: 'A roman numerals string must be given' });
});

router.get('/:numerals', (req, res) => {
  const { numerals } = req.params;
  try {
    res.send({ value: romegen.parse(numerals) });
  } catch (e) {
    res.status(422).send({
      error: e.message,
    });
  }
});

module.exports = router;
