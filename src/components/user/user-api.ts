import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  createRequestParams,
  IApiParams,
  IQueryParams,
} from '../../utils/utils';
import { User } from './user';

const resourceUrl = 'api/users';

export const useFetchUsers = ({
  queryParams,
  onSuccess,
  onError,
}: IApiParams) => {
  return useQuery<any>(
    ['fetchUsers', queryParams],
    () =>
      axios.get(`${resourceUrl}`, { params: createRequestParams(queryParams) }),
    {
      onSuccess,
      onError,
    },
  );
};

export const useCreateOrUpdateUser = ({ onSuccess, onError }: any) => {
  return useMutation<User, any, User>(
    'createUser',
    (user: User) => (user.id ? updateUser(user) : createUser(user)),
    {
      onSuccess,
      onError,
    },
  );
};

export const useDeleteUser = ({ onSuccess, onError }: any) => {
  return useMutation(
    'deteleUser',
    (id: number) => axios.delete(`${resourceUrl}/${id}`),
    {
      onSuccess,
      onError,
    },
  );
};

const createUser = (user: User): any => {
  return axios.post(`${resourceUrl}`, user).then((response) => response.data);
};

const updateUser = (user: User): any => {
  return axios
    .put(`${resourceUrl}/${user.id}`, user)
    .then((response) => response.data);
};
