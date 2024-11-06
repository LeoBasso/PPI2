import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useQuery } from 'react-query';
import queryClient from "../../services/queryClient";

export const createSchedule = async (schedule) => {
  try {
    await customFetch.post("/schedule", schedule);
    await queryClient.invalidateQueries('schedule');
    toast.success("Agendamento criado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

async function getSchedules() {
  try {
    const response = await customFetch.get('/schedules');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

export function useFetchSchedules() {
  return useQuery(['schedule'], getSchedules);
}

export const deleteSchedule = async (id) => {
  try {
    await customFetch.delete(`/schedule/${id}`);
    await queryClient.invalidateQueries('schedule');
    toast.success("Agendamento excluído com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateSchedule = async (id, schedule) => {
  try {
    console.log(id);
    await customFetch.put(`/schedule/${id}`, schedule);
    await queryClient.invalidateQueries('schedule');
    toast.success("Agendamento atualizado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const fetchSchedulesByDate = async (date) => {
  try {
    const response = await customFetch.get('/schedules', { params: { date } });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg || "Erro ao buscar agendamentos.");
    return [];
  }
};

