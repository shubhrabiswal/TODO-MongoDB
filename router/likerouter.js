const express = require('express');
const router = express.Router();
const likecontroller = require('../controller/likeController')
const passport = require('passport');
require('../')

router.post('/addlike',likecontroller.addlikes )
// router.get('/:id', likecontroller.getlikeById);


module.exports = router;