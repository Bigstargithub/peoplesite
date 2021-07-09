const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const cors = require('cors');
const multer = require('multer');

var notice_image = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, 'upload/notice_image/');
    },
    filename: function(req, file, cb)
    {
        cb(null, file.originalname);
    }
})


var main_image = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, 'upload/main_image/');
    },
    filename: function(req, file, cb)
    {
        cb(null, file.originalname);
    }
})

var upload_notice_image = multer({storage: notice_image});
var upload_main_image = multer({storage: main_image});



router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

router.get('/logout',ctrl.get_logout);

router.get('/notice/regist', ctrl.regist_notice);

router.get('/notice/regist/:id', ctrl.regist_notice);

router.get('/notice/member', ctrl.get_notice_member);

router.post('/notice/regist', upload_main_image.single('notice_main_image'), ctrl.notice_regist);

router.post('/notice/image', upload_notice_image.single('image'), ctrl.upload_notice_image);

module.exports = router;