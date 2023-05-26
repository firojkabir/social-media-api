const express = require('express')
const { userRouter } = require('./user.route')
const { postRouter } = require('./post.route')
const { commentRouter } = require('./comment.route')

const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)

module.exports = {
	router
}
