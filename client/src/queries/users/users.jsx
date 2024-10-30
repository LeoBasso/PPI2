import { useQuery } from "react-query";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

export const createUser = async (user) => {
  try {
    await customFetch.post("/user", user);
    toast.success("Usuário criado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const login = async (userLogin) => {
  try {
    const response = await customFetch.post("/auth", userLogin);

    toast.success("Usuário logado com sucesso!");
    return response;
  } catch (error) {
    toast.error(error.response?.data.msg);
  }
};

async function getUsers() {
  try {
    const response = await customFetch.get('/users');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

export function useFetchUsers() {
  return useQuery(['users'], getUsers);
}

export const updateUser = async (id, user) => {
  try {
    await customFetch.put(`/users/${id}`, user);
    toast.success("Usuário atualizado com sucesso!");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};