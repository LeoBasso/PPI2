import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { createUser } from '../queries/users/users';
import FormRow from '../components/Form/FormRow';
import SubmitButton from '../components/Buttons/SubmitButton';
import ClearButtonForm from '../components/Buttons/ClearButtonForm';
import { Link } from "react-router-dom";

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
    <form className="flex h-screen items-center justify-center bg-[#f3f0e2]"
      onSubmit={handleSubmit(handlerCreateUser)}
    >
      <div
        className="w-full max-w-sm p-4  shadow-2xl sm:p-6 md:p-8"
        style={{ background: 'linear-gradient(to right, #d9d6c8, #6e776e)' }}
      >
        <h5 className="text-xl font-medium text-white">
          REGISTRE-SE
        </h5>
        <br />
        <FormRow
          type="text"
          name="name"
          labelText="Nome"
          placeholder="Digite o nome do usuário"
          control={control}
          hasError={JSON.stringify(errors.name?.message)}
        />
        <br />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          placeholder="Digite o e-mail"
          control={control}
          hasError={JSON.stringify(errors.email?.message)}
        />
        <br />
        <FormRow
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Digite senha"
          control={control}
          hasError={JSON.stringify(errors.password?.message)}
        />
        <br />
        <div className="relative inline-flex items-center justify-center">
          <ClearButtonForm onClick={() => reset()} />
          <SubmitButton label="Registrar" />
        </div>
        <div className="text-sm font-medium text-black mt-4 ">
          Já tem uma conta?
          <Link
            className="text-white hover:underline ml-2"
            onClick={() => reset()}
            to="/login"
          >
            Faça o Login
          </Link>
        </div>
      </div>

    </form>


  );
};

export default RegisterCard;
