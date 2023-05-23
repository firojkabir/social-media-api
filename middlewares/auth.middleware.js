const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model")

async function authMiddleware(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).json({
			message: "Unauthorized access"
		})
	}
	const token = req.headers.authorization.split(" ")[1]

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(userId)
		req.userId = userId
		req.user = user
	} catch (e) {
		return res.status(401).json({
			message: "Unauthorized request"
		})
	}

	next()
}

module.exports ={ 
	authMiddleware
}
