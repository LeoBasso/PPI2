import Joi from 'joi';

export const UpdateServiceSchema = Joi.object({
  body: Joi.object({
    type: Joi.string().required(),
    time: Joi.number().required(),
    price: Joi.number().required(),
    autoschedule: Joi.boolean(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  })
});
