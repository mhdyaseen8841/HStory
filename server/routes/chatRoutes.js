const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware.js')
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup} = require('../controllers/chatControllers.js')
router.route('/').post(protect,accessChat).get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);


module.exports = router