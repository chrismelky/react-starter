import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { User } from '.';
import { createRequestParams, IApiParams } from '../../utils/utils';

const resourceUrl = 'api/users';

/**
 * fetch users by page, and optional filters
 * @param IApiParams
 * @returns UseQueryResult
 */
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

/**
 * create new user or updated existing user
 * User to be created or updated is passed to mutate function param
 * @param IApiParams
 * @returns UseMutationResult
 */
export const useCreateOrUpdateUser = ({ onSuccess, onError }: IApiParams) => {
  return useMutation<User, any, User>(
    'createUser',
    (user: User) => (user.id ? updateUser(user) : createUser(user)),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * Delete user
 * @param IApiParams
 * @returns  UseMutationResult
 */
export const useDeleteUser = ({ onSuccess, onError }: IApiParams) => {
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
