const Joi = require('joi')

const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(15)
		.required(),
	
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.required(),

	password: Joi.string()
		.required(),

	age: Joi.number()
		.required(),
	
	phone: Joi.string()
		.required(),

	country: Joi.string()
		.required()
})

module.exports = {
	userSchema: schema
}
