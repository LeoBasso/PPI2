import * as yup from "yup";

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Por favor forneça um email válido")
      .required("Por favor, forneça o email"),
    password: yup
      .string()
      .min(4, "A senha deve ter no mínimo 4 caracteres")
      .required("Por favor, forneça uma senha"),
  })
  .required();
