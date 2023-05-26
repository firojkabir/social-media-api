const { Comment } = require('../models/comment.model')

const createComment = async (req, res) => {
	const newComment = new Comment({ ...req.body, userId: req.userId, postId: req.body.postId })
	const addedComment = await newComment.save()
	res.status(201).json(addedComment)
}

const getAllComments = async (req, res) => {
	const comments = await Comment.find({
		userId: req.userId
		// "postId.type": req.body.postId
	})
	res.json(comments)
}

const getCommentByID = async (req, res) => {
	const { id } = req.params

	try {
		const comment = await Comment.findById(id)
		if (comment) {
			res.json(comment)
		} else {
			res.status(404).json({
				message: `No comment found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const updateCommentById = async (req, res) => {
	const { id } = req.params

	try {
		const comment = await Comment.findById(id)
		if (comment && comment.userId == req.userId) {
			await Comment.findByIdAndUpdate(id, req.body)
			const updatedComment = await Comment.findById(id)
			res.status(200).json(updatedComment)
		} else {
			res.status(404).json({
				message: `No comment found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const deleteCommentById = async (req, res) => {
	const { id } = req.params

	try {
		const comment = await Comment.findById(id)
		if (comment && comment.userId == req.userId) {
			const deletedComment = await Comment.findByIdAndDelete(id)
			res.status(200).json(deletedComment)
		} else {
			res.status(404).json({
				message: `No comment found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

module.exports = {
	createComment,
	getAllComments,
	getCommentByID,
	updateCommentById,
	deleteCommentById
}
