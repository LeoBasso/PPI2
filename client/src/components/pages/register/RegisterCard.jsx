import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserSchema } from '../../../schemas/CreateUserSchema';
import { createUser } from '../../../queries/users/users';
import FormRow from '../../Form/FormRow';
import SubmitButton from '../../Buttons/SubmitButton';
import ClearButtonForm from '../../Buttons/ClearButtonForm';

const RegisterCard = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(CreateUserSchema),
  });

  const handlerCreateUser = async (user) => {
    await createUser(user);
    reset();
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handlerCreateUser)}
      >
        <div className="grid gap-4 mt-4">
          <FormRow
            type="text"
            name="name"
            labelText="Nome"
            placeholder="Digite o nome do usuário"
            control={control}
            hasError={JSON.stringify(errors.name?.message)}
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            placeholder="Digite o e-mail"
            control={control}
            hasError={JSON.stringify(errors.email?.message)}
          />
          <FormRow
            type="password"
            name="password"
            labelText="Senha"
            placeholder="Digite senha"
            control={control}
            hasError={JSON.stringify(errors.password?.message)}
          />
        </div>
        <div className="relative inline-flex items-center justify-center mt-4">
          <ClearButtonForm onClick={() => reset()} />
          <SubmitButton label="Registrar" />
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
