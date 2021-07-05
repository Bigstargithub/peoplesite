const { Router } = require('express');
const router = Router();

router.use('/admin', require('./admin'));

router.use('/', require('./public'));

module.exports = router;