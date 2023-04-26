const express = require('express')

const router = express.Router()
const  {registerUser,authUser,allUsers,otpValidate,forgetPassword} = require('../controllers/userControllers.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser).get(allUsers);
router.route('/forgetpassword').post(forgetPassword)

 router.post('/login',authUser)
 router.post('/otp',otpValidate)


module.exports = router