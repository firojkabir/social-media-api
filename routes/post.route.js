const express = require('express')

const { createPost, getAllPosts, getPostByID, updatePostById, deletePostById, likeAPost, addAComment } = require('../controllers/post.controller')
const { Validator } = require('../middlewares/validator.middleware')
const { postSchema } = require('../schemas/post.schema')

const router = express.Router()

router.get('/', getAllPosts)

router.get('/:id', getPostByID)

router.post('/', Validator(postSchema), createPost)

router.put('/:id', Validator(postSchema), updatePostById)

router.put('/:id/like', likeAPost)

router.put('/:id/comment', addAComment)

router.delete('/:id', deletePostById)

module.exports = {
	postRouter: router
}
