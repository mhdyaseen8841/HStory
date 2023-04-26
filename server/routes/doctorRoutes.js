const express = require('express')
const router = express.Router()
const  {registerDoctor,authDoctor,searchDoc,getDoctorBasedOnSpeciality,forgetpassword,getAlldoctors,sendPatientOtp,updateDoctor,validatePatient,getDoctorByID,validateForgetPassword} = require('../controllers/doctorControllers.js')
const protect = require('../middleware/authMiddleware.js')
router.route('/').post(registerDoctor).get(protect,searchDoc);

router.post('/login',authDoctor)

router.route('/validatePatient').post(protect,validatePatient)
router.route('/sendPatientOtp').post(protect,sendPatientOtp)
router.route('/searchDoc').get(protect,getDoctorBasedOnSpeciality)
router.route('/getDoctorById').post(protect,getDoctorByID).put(protect,updateDoctor)
router.route('/getAlldoc').get(protect,getAlldoctors)
router.route('/forgetpassword').post(forgetpassword)
router.route('/validateForgetPassword').post(validateForgetPassword)
// router.route('/resetpass').post(protect,updateDoctor)

module.exports = router