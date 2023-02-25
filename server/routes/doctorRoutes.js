const express = require('express')
const router = express.Router()
const  {registerDoctor,authDoctor,searchDoc,getspecialization,addspecialization,getDoctorBasedOnSpeciality,getAlldoctors} = require('../controllers/doctorControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerDoctor).get(searchDoc);

router.post('/login',authDoctor)

router.route('/specialization').get(getspecialization).post(addspecialization)

router.route('/searchDoc').get(getDoctorBasedOnSpeciality)

router.route('/getAlldoc').get(getAlldoctors)


module.exports = router