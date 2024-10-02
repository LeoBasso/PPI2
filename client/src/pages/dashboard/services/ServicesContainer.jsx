import { useState } from "react";
import Service from "../../../components/pages/Service";
import CreateServiceModal from "../../../components/pages/CreateServiceModal";
import { useFetchServices } from "../../../queries/services/services";

const ServicesContainer = () => {
  const { data, error, isLoading } = useFetchServices();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar seus serviços: {error.message}</div>;
  }

  const service = data;
  console.log(service);

  if (service?.length <= 0) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-[#1c1917] relative shadow-md sm:rounded-lg overflow-hidden border border-gray-500">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateServiceModal />
                  <h6>Nenhuma propriedade encontrada</h6>
                </div>
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
          <div className="bg-[#1c1917] relative shadow-md sm:rounded-lg overflow-hidden border border-gray-400">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                <CreateServiceModal />
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500 border-gray-300">
                <thead className="text-xs text-white uppercase bg-[#09090b] border-gray-300">
                  <tr>                   
                    <th scope="col" className="px-4 py-4">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tempo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Valor
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Editar
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#d6d3d1] text-black">
                  {service?.map((service) => (
                    <Service
                      key={service.id}
                      service={service}
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

export default ServicesContainer;
