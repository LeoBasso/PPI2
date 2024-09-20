import Joi from 'joi';
import { ScheduleTypes } from '../../domain/enums/ScheduleTypes.enum';

export const UpdateScheduleSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid(...Object.values(ScheduleTypes)),
    hour: Joi.string(),
    date: Joi.date().min(4),
  }),

  params: Joi.object({
    id: Joi.number().required(),
  })
});
