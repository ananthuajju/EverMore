import Joi from "joi";

const validation = function (reqBody) {

	const schema = Joi.object({
		name: Joi.string().required().min(4),
		email: Joi.string().required().email().min(6),
		// password: Joi.string().required().min(6),
	});
	const data = schema.validate(reqBody);
	return data;
};

export default validation;
