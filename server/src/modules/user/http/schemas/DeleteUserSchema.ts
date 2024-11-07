import Joi from 'joi';

export const DeleteUserSchema = Joi.object({

  params: Joi.object({
    id: Joi.number().required(),
  })
});
