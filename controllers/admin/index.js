const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const cors = require('cors');

router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

router.get('/logout',ctrl.get_logout);

router.get('/notice/regist', ctrl.regist_notice);

router.get('/notice/member', ctrl.get_notice_member);

module.exports = router;