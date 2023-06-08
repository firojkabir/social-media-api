const { User } = require('../models/user.model')

const getAllUsers = async (req, res) => {
	const users = await User.find()
	res.json(users)
}

const getCurrentUser = async (req, res) => {
	const user = await User.find({
		_id: req.userId
	})
	res.json(user)
}

const getUserById = async (req, res) => {
	const { id } = req.params

	try {
		const user = await User.findById(id)
		if (user) {
			res.json(user)
		} else {
			res.status(404).json({
				message: `No user found with id '${id}'`
			})
		}
	} catch (e) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const updateUserById = async (req, res) => {
	const { id } = req.params

	try {
		const user = await User.findById(id)
		if (user && user._id == req.userId) {
			await User.findByIdAndUpdate(id, req.body)
			const updatedUser = await User.findById(id)
			res.status(200).json(updatedUser)
		} else {
			res.status(404).json({
				message: `No user found with id '${id}' OR you can update only your account`
			})
		}
	} catch (e) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

const followUser = async (req, res) => {
	const { id } = req.params

	if (req.userId !== id) {
		try {
			const userToBeFollowing = await User.findById(id)
			const userWhoFollows = await User.findById(req.userId)

			if (!userToBeFollowing.followers.includes(req.userId)) {
				await userToBeFollowing.updateOne({ $push: { followers: req.userId } })
				await userWhoFollows.updateOne({ $push: { followings: id } })

				res.status(200).json({
					message: `User has been followed!`
				})
			} else {
				res.status(403).json({
					message: `This user has already been followed!`
				})
			}
		} catch (err) {
			res.status(500).json(err)
		}
	} else {
		res.status(400).json({
			message: `User can't follow themself/itself.`
		})
	}
}

const unfollowUser = async (req, res) => {
	const { id } = req.params

	if (req.userId !== id) {
		try {
			const userToBeUnfollowing = await User.findById(id)
			const userWhoUnfollows = await User.findById(req.userId)

			if (userToBeUnfollowing.followers.includes(req.userId)) {
				await userToBeUnfollowing.updateOne({ $pull: { followers: req.userId } })
				await userWhoUnfollows.updateOne({ $pull: { followings: id } })

				res.status(200).json({
					message: `User has been unfollowed!`
				})
			} else {
				res.status(403).json({
					message: `This user has already been unfollowed!`
				})
			}
		} catch (err) {
			res.status(500).json(err)
		}
	} else {
		res.status(400).json({
			message: `User can't unfollow themself/itself.`
		})
	}
}

const deleteUserById = async (req, res) => {
	const { id } = req.params

	try {
		const user = await User.findById(id)
		if (user && user._id == req.userId) {
			const deletedUser = await User.findByIdAndDelete(id)
			res.status(200).json(deletedUser)
		} else {
			res.status(404).json({
				message: `No user found with id '${id}' OR you can delete only your account`
			})
		}
	} catch (e) {
		res.status(400).json({
			message: `Invalid id '${id}'`
		})
	}
}

module.exports = {
	getAllUsers,
	getCurrentUser,
	getUserById,
	updateUserById,
	followUser,
	unfollowUser,
	deleteUserById
}
