const { Router } = require('express');
const romegen = require('../gen/romegen.js');

const router = Router();

router.get('/:decimal', (req, res) => {
  const decimal = parseInt(req.params.decimal, 10);

  res.send({ value: romegen.generate(decimal) });
});

module.exports = router;
