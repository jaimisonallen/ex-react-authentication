import axios from 'axios';

const URI = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${URI}/users`,
});

export const useAuthApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/validate', { token });
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/authenticate', { email, password });
    return response.data;
  },
  signout: async () => {
    // const response = await api.post('/logout');
    // return response.data;
    return { status: true };
  },
});
