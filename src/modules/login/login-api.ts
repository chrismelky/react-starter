import axios from 'axios';
import { useMutation } from 'react-query';

const resourceUrl = 'api/auth';

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation(
    'login',
    (credentials: any) => axios.post(`${resourceUrl}/login`, credentials),
    { onSuccess, onError },
  );
};
