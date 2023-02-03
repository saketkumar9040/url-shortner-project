const express=require('express');
const router=express.Router();
const {createUrl}=require('../controllers/UrlController');

router.post('/create',createUrl);

module.exports=router;