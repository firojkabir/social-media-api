const { Post } = require('../models/post.model')

const getAllPosts = async (req, res) => {
	const posts = await Post.find({
		userId: req.userId
	})
	res.json(posts)
}

const getPostByID = async (req, res) => {
	const { id } = req.params

	try {
		const post = await Post.findById(id)
		if (post && post.userId == req.userId) {
			res.json(post)
		} else {
			res.status(404).json({
				message: `No post found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const createPost = async (req, res) => {
	const newPost = new Post({ ...req.body, userId: req.userId })
	const insertedPost = await newPost.save()
	res.status(201).json(insertedPost)
}

const updatePostById = async (req, res) => {
	const { id } = req.params

	try {
		const post = await Post.findById(id)
		if (post && post.userId == req.userId) {
			await Post.findByIdAndUpdate(id, req.body)
			const updatedPost = await Post.findById(id)
			res.status(200).json(updatedPost)
		} else {
			res.status(404).json({
				message: `No post found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const likeAPost = async (req, res) => {
	const { id } = req.params

	try {
		const post = await Post.findById(id)
		if (!post.likes.includes(req.userId)) {
			await post.updateOne({ $push: { likes: req.userId } })
			res.status(200).json({
				message: `The post has been liked`
			})
		} else {
			await post.updateOne({ $pull: { likes: req.userId } })
			res.status(200).json({
				message: `The post has been disliked`
			})
		}
	} catch (err) {
		res.status(500).json(err)
	}
}

const deletePostById = async (req, res) => {
	const { id } = req.params

	try {
		const post = await Post.findById(id)
		if (post && post.userId == req.userId) {
			const deletedPost = await Post.findByIdAndDelete(id)
			res.status(200).json(deletedPost)
		} else {
			res.status(404).json({
				message: `No post found with id '${id}'`
			})
		}
	} catch (err) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

module.exports = {
	getAllPosts,
	getPostByID,
	createPost,
	updatePostById,
	likeAPost,
	deletePostById
}