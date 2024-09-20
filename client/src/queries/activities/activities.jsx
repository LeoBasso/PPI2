import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useQuery } from 'react-query';
import queryClient from "../../services/queryClient";

export const createActivity = async (activity) => {
  try {
    await customFetch.post("/activity", activity);
    await queryClient.invalidateQueries('activities');
    toast.success("Atividade criada com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

async function getActivities() {
  try {
    const response = await customFetch.get('/activities');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

export function useFetchActivities() {
  return useQuery(['activities'], getActivities);
}

export const deleteActivity = async (id) => {
  try {
    await customFetch.delete(`/activity/${id}`);
    await queryClient.invalidateQueries('activities');
    toast.success("Atividade deletada com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const updateActivity = async (id, activity) => {
  try {
    console.log(id);
    await customFetch.put(`/activity/${id}`, activity);
    await queryClient.invalidateQueries('activities');
    toast.success("Atividade atualizada com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
