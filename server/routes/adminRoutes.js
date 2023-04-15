const express = require('express')

const router = express.Router()
const  {registerUser,authUser,getpendingDoctors,acceptdoctor,getspecialization,addspecialization,getAllUsers} = require('../controllers/adminControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/login').post(authUser);

router.route('/getPendingReq').get(getpendingDoctors).post(acceptdoctor)

router.route('/specialization').get(protect,getspecialization).post(protect,addspecialization)

router.route('/getAllUsers').get(protect,getAllUsers)

//  router.post('/login',authUser)
//  router.post('/otp',otpValidate)

module.exports = router