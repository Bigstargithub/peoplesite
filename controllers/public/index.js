const { Router } = require('express');
const router = Router();
const ctrl = require('./public.ctrl');

router.get('/', ctrl.get_main);

router.get('/:group', ctrl.get_main_group);

router.get('/apply/:id', ctrl.get_apply);

router.get('/notice/:id', ctrl.get_notice_detail);

module.exports = router;