import Joi from 'joi';

export const CreateServiceSchema = Joi.object({
  body: Joi.object({
    type: Joi.string().required(),
    time: Joi.number().required(),
    price: Joi.number().required(),
    autoschedule: Joi.boolean(),
  }),
});
