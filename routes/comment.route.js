const express = require('express')

const { createComment, getAllComments, getCommentByID, updateCommentById, deleteCommentById } = require('../controllers/comment.controller')
const { Validator } = require('../middlewares/validator.middleware')
const { commentSchema } = require('../schemas/comment.schema')

const router = express.Router()

router.post('/', Validator(commentSchema), createComment)

router.get('/', getAllComments)

router.get('/:id', getCommentByID)

router.put('/:id', Validator(commentSchema), updateCommentById)

router.delete('/:id', deleteCommentById)

module.exports = {
	commentRouter: router
}
