const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_FACTOR = 10

const UserSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true,
	},
	email: {
	  type: String,
	  required: true,
	  validate: validateEmail,
	//   unique: true,
	},
	password: {
	  type: String,
	  required: true,
	},
	age: {
	  type: Number,
	  required: true,
	},
	phone: {
		type: String,
		required: true,
		validate: validatePhone,
	},
	country: {
	  type: String,
	  required: true,
	}, 
	followers: {
		type: Array,
		default: [],
	},
	followings: {
		type: Array,
		default: [],
	}
  }, {
	toJSON: {
		transform: function (doc, ret) {
			delete ret.password;
		}
	}
});

UserSchema.pre('save', async function(next) {
	try {
		const salt = await bcrypt.genSalt(SALT_FACTOR)
		this.password = await bcrypt.hash(this.password, salt)
		return next()
	} catch (e) {
		return next(e)
	}
})

UserSchema.pre('findOneAndUpdate', async function() {
	const salt = await bcrypt.genSalt(SALT_FACTOR)
	this._update.password = await bcrypt.hash(this._update.password, salt)
})

UserSchema.methods.validatePassword = function(plainTextPassword) {
	return bcrypt.compareSync(plainTextPassword, this.password)
}

const User = mongoose.model("User", UserSchema);

async function validateEmail(email) {
	const existUser = await User.findOne({ email })

	if (existUser) throw new Error('Email address already exists')
}

async function validatePhone(phone) {
	const duplicatePhone = await User.findOne({ phone })

	if (duplicatePhone) throw new Error('Duplicate phone number, try another one')
}

module.exports = { User };
