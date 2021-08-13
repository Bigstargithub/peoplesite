const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const cors = require('cors');
const multer = require('multer');
const { request } = require('../../app');
const passport = require('passport');

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

function is_login(req, res, next){
    if(req.user == undefined)
    {
        res.send('<script type="text/javascript">alert("로그인 후에 다시 접속시도 바랍니다.");window.location.href="/admin"</script>');
    }
    else
    {
        next();
    }
}



router.get('/', ctrl.get_main);

router.post('/login', ctrl.post_login);

router.get('/logout',ctrl.get_logout);

router.get('/notice/regist', is_login, ctrl.regist_notice);

router.get('/notice/regist/:id', is_login, ctrl.regist_notice);

router.get('/notice/member', is_login,ctrl.get_notice_member);

router.post('/notice/regist', is_login, sample_file.fields([{'name': 'notice_main_image'}, {'name': 'resume_file'}]), ctrl.notice_regist);

router.post('/notice/image', is_login, upload_notice_image.single('image'), ctrl.upload_notice_image);

router.post('/notice/active/:id', is_login, ctrl.update_notice_active);

router.post('/notice/status/:id', is_login, ctrl.update_notice_status);

router.get('/notice/modify/:id', is_login, ctrl.get_modify_notice);

router.get('/notice/delete/:id', is_login, ctrl.delete_notice);

router.post('/notice/modify/:id', is_login, sample_file.fields([{'name': 'notice_main_image'}, {'name': 'resume_file'}]), ctrl.post_modify_notice);

//지원자 리스트 페이지
router.get('/notice/applies/:id', is_login, ctrl.get_applies_list);
//지원자 리스트 업데이트
router.post('/apply/modify/:id', is_login,ctrl.post_update_applies);

module.exports = router;