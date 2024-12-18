import { useState } from "react";
import CreateScheduleModal from "../../../components/pages/CreateScheduleModal";
import Schedules from "../../../components/pages/Schedules";
import { useFetchSchedules } from "../../../queries/schedules/schedules";
import { getUserFromLocalStorage } from "../../../utils/localStorage";

const SchedulesContainer = () => {
  const { data, error, isLoading } = useFetchSchedules();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar seus agendamentos: {error.message}</div>;
  }

  const schedule = data;

  const user = getUserFromLocalStorage();

  if (schedule?.length <= 0) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-[#363636] relative shadow-md sm:rounded-lg overflow-hidden border border-gray-500">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                {user?.role == 'user' && (
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                    <CreateScheduleModal />
                  </div>
                )}
                <h6>Nenhum agendamento encontrado</h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex">
      <section>
        <div className="max-w-screen-xl">
          <div className="bg-[#363636] relative shadow-md sm:rounded-lg overflow-hidden border border-gray-400">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              {user?.role == 'user' && (
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateScheduleModal />
                </div>
              )}
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500 border-gray-300">
                <thead className="text-xs text-white uppercase bg-[#09090b] border-gray-300">
                  <tr>
                    {user?.role == 'admin' && (
                      <th scope="col" className="px-4 py-4">
                        Nome do cliente
                      </th>
                    )}
                    <th scope="col" className="px-4 py-4">
                      Serviço
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Hora
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Data
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Valor
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    {user?.role == 'admin' && (
                    <th scope="col" className="px-4 py-3 text-center" colSpan="2">
                      Ações
                    </th>)}
                    {user?.role == 'admin' && (
                      <th scope="col" className="px-4 py-4">
                        Editar
                      </th>)}
                    {user?.role == 'admin' && (
                      <th scope="col" className="px-4 py-4">
                        Excluir
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-[#d6d3d1] text-black">
                  {schedule?.map((schedule) => (
                    <Schedules
                      key={schedule.id}
                      schedule={schedule}
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

export default SchedulesContainer;
