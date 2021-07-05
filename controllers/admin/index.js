const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

module.exports = router;