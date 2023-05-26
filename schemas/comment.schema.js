const Joi = require('joi')

const schema = Joi.object({
	content: Joi.string()
		.min(10)
		.max(50)
		.required(),
	
	postId: Joi.string()
})

module.exports = {
	commentSchema: schema
}
