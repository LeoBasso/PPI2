import Joi from 'joi';

export const DeleteScheduleSchema = Joi.object({

  params: Joi.object({
    id: Joi.number().required(),
  })
});
