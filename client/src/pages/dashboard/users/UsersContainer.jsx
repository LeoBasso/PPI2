import { useState } from "react";
import User from "../../../components/pages/Users";
import { useFetchUsers } from "../../../queries/users/users";

const UsersContainer = () => {
  const { data: users, error, isLoading } = useFetchUsers();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os usuários: {error.message}</div>;
  }

  return (
    <div className="flex">
      <section>
        <div className="max-w-screen-xl">
          <div className="bg-[#363636] relative shadow-md sm:rounded-lg overflow-hidden border border-gray-400">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500 border-gray-300">
                <thead className="text-xs text-white uppercase bg-[#09090b] border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Nome
                    </th>
                    <th scope="col" className="px-4 py-3">
                      E-mail
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Número
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Permissão
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#d6d3d1] text-black">
                  {users?.map((user) => (
                    <User
                      key={user.id}
                      user={user}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersContainer;
