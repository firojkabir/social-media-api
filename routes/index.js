const express = require('express')
const { userRouter } = require('./user.route')
const { postRouter } = require('./post.route')

const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

module.exports = {
	router
}
