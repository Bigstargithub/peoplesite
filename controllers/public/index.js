const { Router } = require('express');
const router = Router();
const ctrl = require('./public.ctrl');
const multer = require('multer');

var resume_file_storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, 'upload/apply_file/');
    },
    filename: function(req, file, cb)
    {
        cb(null, file.originalname);
    }
});

let upload = multer({storage: resume_file_storage});

router.get('/', ctrl.get_main);

router.get('/:group', ctrl.get_main_group);

router.get('/apply/:id', ctrl.get_apply);

router.get('/notice/:id', ctrl.get_notice_detail);

router.post('/apply/:id', upload.fields([{name:'resume_file'},{name:'portfolio_file'}]),ctrl.post_apply);

router.post('/apply/mo/:id', upload.fields([{name: 'mo_submit_resume_file'}, {name: 'mo_submit_portfolio_file'}]),ctrl.post_mo_apply);

router.get('/apply/text', ctrl.get_text_apply);

module.exports = router;