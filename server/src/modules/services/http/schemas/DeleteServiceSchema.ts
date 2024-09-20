import Joi from 'joi';

export const DeleteServiceSchema = Joi.object({

  params: Joi.object({
    id: Joi.number().required(),
  })
});
