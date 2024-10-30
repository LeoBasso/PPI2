import Joi from 'joi';

export const UpdateUserSchema = Joi.object({
  body: Joi.object({
    role: Joi.string().required(),
  }),
});
