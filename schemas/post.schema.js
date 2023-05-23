const Joi = require('joi')

const schema = Joi.object({
	content: Joi.string()
		.min(10)
		.max(65)
		.required(),

	image: Joi.any()
})

module.exports = {
	postSchema: schema
}
