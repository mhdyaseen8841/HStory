const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware.js')
const {accessChat,fetchChats} = require('../controllers/chatControllers.js')
router.route('/').post(protect,accessChat).get(protect,fetchChats)




module.exports = router