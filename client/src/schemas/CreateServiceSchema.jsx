import * as yup from "yup";

export const CreateServiceSchema = yup
  .object({
    type: yup.string().required("Por favor, forneça uma tarefa"),
    time: yup.number().required("Por favor, forneça o tempo de duração").min(1,"Tempo deve ser maior que 0"),
    price: yup.number().required("Por favor, forneça o valor do serviço"),
  })
  .required();
