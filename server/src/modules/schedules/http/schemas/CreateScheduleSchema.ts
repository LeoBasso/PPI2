import Joi from 'joi';
import { ScheduleTypes } from '../../domain/enums/ScheduleTypes.enum';

export const CreateScheduleSchema = Joi.object({
  body: Joi.object({
    date: Joi.date().required().min(4),
    hour: Joi.string()
      .required()
      .pattern(/^([01]?[0-9]|2[0-3]):(00|30)$/),
    status: Joi.string().valid(...Object.values(ScheduleTypes)).required(),
  }),
});
