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


var sample_file_upload = multer.diskStorage({
    destination: function(req,file, cb)
    {
        cb(null, 'upload/notice_file');
    },
    filename: function(req, file, cb)
    {
        cb(null, file.originalname);
    }
});

var upload_notice_image = multer({storage: notice_image});
var sample_file = multer({storage: sample_file_upload});



router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

router.get('/logout',ctrl.get_logout);

router.get('/notice/regist', ctrl.regist_notice);

router.get('/notice/regist/:id', ctrl.regist_notice);

router.get('/notice/member', ctrl.get_notice_member);

router.post('/notice/regist', sample_file.fields([{'name': 'notice_main_image'}, {'name': 'resume_file'}]), ctrl.notice_regist);

router.post('/notice/image', upload_notice_image.single('image'), ctrl.upload_notice_image);

router.post('/notice/active/:id', ctrl.update_notice_active);

router.post('/notice/status/:id', ctrl.update_notice_status);

router.get('/notice/modify/:id', ctrl.get_modify_notice);

router.post('/notice/modify/:id', sample_file.fields([{'name': 'notice_main_image'}, {'name': 'resume_file'}]), ctrl.post_modify_notice);

module.exports = router;