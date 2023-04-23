const express = require('express')

const router = express.Router()
const  {registerUser,authUser,allUsers,otpValidate} = require('../controllers/userControllers.js')
const {allPrescriptions,createPrescription,editPrescription,getPrescriptionById,getCurrentMedicines} = require('../controllers/prescriptionControllers.js')
const protect = require('../middleware/authMiddleware.js')
const doctorProtect = require('../middleware/doctorAuthMiddleware.js')
// router.route('/').post(registerUser).get(allPrescriptions);

router.route('/allprescriptions').post(protect,allPrescriptions);
router.route('/addprescription').post(doctorProtect,createPrescription).put(doctorProtect,editPrescription)

router.route('/getprescriptionbyid').post(protect,getPrescriptionById)
router.route('/getcurrentmedicines').post(protect,getCurrentMedicines)
module.exports = router