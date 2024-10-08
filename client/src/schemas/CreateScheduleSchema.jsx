import * as yup from "yup";

export const CreateScheduleSchema = yup
  .object({
    date: yup.date().required("Por favor, forneça a data"),
    hour: yup.string().required("Por favor, forneça o horário"),
  })
  .required();
