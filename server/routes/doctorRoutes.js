const express = require('express')
const router = express.Router()
const  {registerDoctor,authDoctor,searchDoc,getDoctorBasedOnSpeciality,getAlldoctors,sendPatientOtp,validatePatient} = require('../controllers/doctorControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerDoctor).get(protect,searchDoc);

router.post('/login',authDoctor)

router.route('/validatePatient').post(protect,validatePatient)
router.route('/sendPatientOtp').post(protect,sendPatientOtp)
router.route('/searchDoc').get(protect,getDoctorBasedOnSpeciality)

router.route('/getAlldoc').get(protect,getAlldoctors)

module.exports = router