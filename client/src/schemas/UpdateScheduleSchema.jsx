import * as yup from 'yup';

export const UpdateScheduleSchema = yup
    .object({
        date: yup.date().typeError("Por favor, forneça a data"),
        hour: yup.string().required("Por favor, forneça o horário"),
        status: yup.string()
    })
    .required();