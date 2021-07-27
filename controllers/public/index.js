const { Router } = require('express');
const router = Router();
const ctrl = require('./public.ctrl');

router.get('/', ctrl.get_main);

router.get('/notice/:id', ctrl.get_notice_detail);

module.exports = router;