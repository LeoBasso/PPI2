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
