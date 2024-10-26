const express=require('express');
const { verification } = require('../Middlewares/auth');
const { getPaidBooks, getFreeBooks } = require('../Controllers/book');
const router=express.Router();
router.get('/paid',verification,getPaidBooks);
router.get('/free',getFreeBooks);
module.exports=router