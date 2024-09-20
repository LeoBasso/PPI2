import * as yup from 'yup';

export const UpdateProfileSchema = yup
    .object({
        name: yup.string().required('Por favor, forneça o nome'),
        email: yup.string().email('Por favor forneça um email válido'),
        password: yup.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
    })
    .required();