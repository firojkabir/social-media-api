const express = require('express')
const { Validator } = require('../middlewares/validator.middleware')
const { userSchema } = require('../schemas/user.schema')
const { login, register, checkEmailExists, checkDuplicatePhone } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/login', login)

router.post('/register', Validator(userSchema), register)

router.post('/email/check', checkEmailExists)

router.post('/phone/check', checkDuplicatePhone)

module.exports = {
	authRouter: router
}
