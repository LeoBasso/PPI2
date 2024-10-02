import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useQuery } from 'react-query';
import queryClient from "../../services/queryClient";

export const createService = async (service) => {
  try {
    await customFetch.post("/service", service);
    await queryClient.invalidateQueries('services');
    toast.success("Serviço criado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

async function getServices() {
  try {
    const response = await customFetch.get('/services');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

export function useFetchServices() {
  return useQuery(['services'], getServices);
}

export const deleteService = async (id) => {
  try {
    await customFetch.delete(`/service/${id}`);
    await queryClient.invalidateQueries('services');
    toast.success("Serviço excluído com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateService = async (id, service) => {
  try {
    console.log(id);
    await customFetch.put(`/service/${id}`, service);
    await queryClient.invalidateQueries('services');
    toast.success("Serviço atualizado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
