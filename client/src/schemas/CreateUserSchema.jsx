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
  })
  .required();
