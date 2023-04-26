const express = require('express')

const router = express.Router()
const  {registerUser,authUser,allUsers,otpValidate,forgetPassword,validateForgetPassword} = require('../controllers/userControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser).get(allUsers);
router.route('/forgetpassword').post(forgetPassword)

 router.post('/login',authUser)
 router.post('/otp',otpValidate)
 router.route('/validateForgetPassword').post(validateForgetPassword)


module.exports = router