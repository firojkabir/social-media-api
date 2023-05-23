const { User } = require('../models/user.model')
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (user.validatePassword(password)) {
			res.json({
				token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
			})
		} else {
			res.status(401).json({
				message: "Invalid email or password"
			})
		}
	} catch (err) {
		console.log(err)
	}
}

const register = async (req, res, next) => {
	const newUser = new User(req.body)

	try {
		const insertedUser = await newUser.save()
		res.status(201).json(insertedUser)
	} catch(err) {
		err.statusCode = 400
		next(err)
	}
}

module.exports = {
	login,
	register
}