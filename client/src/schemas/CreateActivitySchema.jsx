import * as yup from "yup";

export const CreateActivitySchema = yup
  .object({
    distance: yup.number().required("Por favor, forneça a distance").min(1,"Distância deve ser maior que 0"),
    time: yup.number().required("Por favor, forneça o tempo").min(1,"Tempo deve ser maior que 0"),
    date: yup.date().required("Por favor, forneça a data"),
  })
  .required();
