import * as yup from 'yup';

export const CreateUserSchema = yup
  .object({
    name: yup
      .string()
      .required('Por favor, forneça o nome')
      .min(4, 'O nome deve ter no mínimo 4 caracteres'),
    email: yup
      .string()
      .email('Por favor forneça um email válido')
      .required('Por favor, forneça o email'),
    password: yup
      .string()
      .min(4, 'A senha deve ter no mínimo 4 caracteres')
      .required('Por favor, forneça uma senha'),
    number: yup
      .string()
      .matches(
        /^(\+55\s?)?(\()?(\d{2})(\))?\s?(\d{4,5})[-\s]?\d{4}$/,
        "Número de telefone inválido"
      )
      .required('Por favor, forneça o número de telefone'),  // Campo obrigatório
  })
  .required();
