const { Router } = require('express');
const router = Router();
const ctrl = require('./public.ctrl');

router.get('/', ctrl.get_main);

module.exports = router;