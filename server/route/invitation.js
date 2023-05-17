const express = require('express');
const {getAll,save,del} = require('../controller/invitation');
const {authorization} = require('../controller/auth')
const router = express.Router();


router.get('/all',authorization,getAll)
router.post('/save',authorization,save)
router.post('/delete',authorization,del)

module.exports = router;