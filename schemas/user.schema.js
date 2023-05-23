const Joi = require('joi')

const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(20)
		.required(),
	
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.required(),

	password: Joi.string(),

	age: Joi.number()
		.required(),

	country: Joi.string()
		.required()
})

module.exports = {
	userSchema: schema
}
