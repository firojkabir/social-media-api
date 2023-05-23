const express = require('express')
const { Validator } = require('../middlewares/validator.middleware')
const { userSchema } = require('../schemas/user.schema')
const { login, register } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/login', login)

router.post('/register', Validator(userSchema), register)

module.exports = {
	authRouter: router
}
