const express = require('express');
const {getPublicInvitation} = require('../controller/invitation');
const router = express.Router();
 
router.get('/invitation/:id',getPublicInvitation)



module.exports = router