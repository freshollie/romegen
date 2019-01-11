const { Router } = require('express');
const romegen = require('../gen/romegen.js');

const router = Router();

router.get('/', (_, res) => {
  res.status(422).send({
    error: 'A number to convert is required',
  });
});

router.get('/:decimal', (req, res) => {
  const decimal = parseInt(req.params.decimal, 10);

  try {
    res.send({ value: romegen.generate(decimal) });
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
});

module.exports = router;
