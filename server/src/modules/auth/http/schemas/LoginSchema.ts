import Joi from 'joi';

export const LoginSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  }),
});
