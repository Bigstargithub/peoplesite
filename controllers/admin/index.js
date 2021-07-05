const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const cors = require('cors');

router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

module.exports = router;