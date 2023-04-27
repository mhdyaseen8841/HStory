const express = require('express')

const router = express.Router()
const  {registerUser,authUser,getpendingDoctors,getDashboardData,deleteSpecialization,acceptdoctor,UnblockDoctor,getRejectedDoctors,getspecialization,addspecialization,getAllUsers,rejectReq,BlockDoctor} = require('../controllers/adminControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/login').post(authUser);

router.route('/getPendingReq').get(getpendingDoctors).post(acceptdoctor)
router.route('/rejectReq').post(rejectReq).get(getRejectedDoctors)
router.route('/blockDoctor').post(BlockDoctor)
router.route('/unblockDoctor').post(UnblockDoctor);

router.route('/specialization').get(protect,getspecialization).post(protect,addspecialization)

router.route('/deleteSpecialization').post(deleteSpecialization)
router.route('/getAllUsers').get(protect,getAllUsers)
router.route('/getDashboardData').get(getDashboardData)
//  router.post('/login',authUser)
//  router.post('/otp',otpValidate)

module.exports = router