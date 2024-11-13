import Joi from 'joi';
import { ScheduleTypes } from '../../domain/enums/ScheduleTypes.enum';
import { ScheduleHours } from '../../domain/enums/ScheduleHours.enum';

export const CreateScheduleSchema = Joi.object({
  body: Joi.object({
    date: Joi.date().required().min(4),
    hour: Joi.string().valid(...Object.values(ScheduleHours)).required(),
    status: Joi.string().valid(...Object.values(ScheduleTypes)).required(),
  }),
});
