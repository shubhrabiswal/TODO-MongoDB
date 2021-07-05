const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const passport = require('passport');
require('../')
// const middleware = require('../middleware/middleware')

router.post('/signup',usercontroller.userRegister)
router.post('/login',usercontroller.userLogin)
router.get('/registered_user',usercontroller.getRegisteredUser)


module.exports = router;