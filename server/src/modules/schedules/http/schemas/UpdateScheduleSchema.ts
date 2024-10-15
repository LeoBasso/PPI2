import Joi from 'joi';
import { ScheduleTypes } from '../../domain/enums/ScheduleTypes.enum';

export const UpdateScheduleSchema = Joi.object({
  body: Joi.object({
    date: Joi.date().min(4),
    hour: Joi.string(),
    status: Joi.string().valid(...Object.values(ScheduleTypes)),
  }),

  params: Joi.object({
    id: Joi.number().required(),
  })
});
