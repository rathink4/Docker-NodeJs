const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.post("/signUp", usersController.userSignup)
router.post("/login", usersController.userLogin)

module.exports = router