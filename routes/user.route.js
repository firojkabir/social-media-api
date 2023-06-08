const express = require('express')

const { getAllUsers, getCurrentUser, getUserById, updateUserById, deleteUserById, followUser, unfollowUser } = require('../controllers/user.controller')
const { Validator } = require('../middlewares/validator.middleware')
const { userSchema } = require('../schemas/user.schema')

const router = express.Router()

router.get('/', getAllUsers)

router.get('/current', getCurrentUser)

router.get('/:id', getUserById)

router.put('/:id', Validator(userSchema), updateUserById)

router.put('/:id/follow', followUser)

router.put('/:id/unfollow', unfollowUser)

router.delete('/:id', deleteUserById)

module.exports = {
	userRouter: router
}
