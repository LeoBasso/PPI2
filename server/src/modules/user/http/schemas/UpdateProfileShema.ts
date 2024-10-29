import Joi from 'joi';

export const UpdateProfileSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    number: Joi.string().required().min(10).max(15)
  }),
});
