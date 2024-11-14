import * as yup from "yup";

export const CreateServiceSchema = yup
  .object({
    type: yup.string().required("Por favor, forneça uma tarefa"),
    time: yup.number().typeError("O tempo de duração deve ser um número válido"),
    price: yup.number().typeError("Por favor, forneça o valor do serviço"),
  })
  .required();
