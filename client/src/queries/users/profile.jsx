import { useQuery } from 'react-query';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import queryClient from '../../services/queryClient';

async function getProfile() {
    const { data, error } = await customFetch.get(`/profile`);
    if (error) {
        toast.success(error);
    }
    return data;
}

export function useFetchProfile() {
    return useQuery(['profile'], getProfile);
}

export const updateProfile = async (profile) => {
    try {
        const response = await customFetch.put(`/profile`, profile);
        await queryClient.invalidateQueries('profile');
        toast.success('Perfil alterado com sucesso!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
};