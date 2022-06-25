import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Role } from '.';
import { createRequestParams, IApiParams } from '../../utils/utils';

const resourceUrl = 'api/roles';

/**
 * fetch Roles by page, and optional filters
 * @param IApiParams
 * @returns UseQueryResult
 */
export const useFetchRoles = ({
  queryParams,
  onSuccess,
  onError,
}: IApiParams) => {
  return useQuery<any>(
    ['fetchRoles', queryParams],
    () =>
      axios.get(`${resourceUrl}`, { params: createRequestParams(queryParams) }),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * create new Role or updated existing Role
 * Role to be created or updated is passed to mutate function param
 * @param IApiParams
 * @returns UseMutationResult
 */
export const useCreateOrUpdateRole = ({ onSuccess, onError }: IApiParams) => {
  return useMutation<Role, any, Role>(
    'createRole',
    (role: Role) => (role.id ? updateRole(role) : createRole(role)),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * Delete Role
 * @param IApiParams
 * @returns  UseMutationResult
 */
export const useDeleteRole = ({ onSuccess, onError }: IApiParams) => {
  return useMutation(
    'deteleRole',
    (id: number) => axios.delete(`${resourceUrl}/${id}`),
    {
      onSuccess,
      onError,
    },
  );
};

const createRole = (role: Role): any => {
  return axios.post(`${resourceUrl}`, role);
};

const updateRole = (role: Role): any => {
  return axios.patch(`${resourceUrl}/${role.id}`, role);
};
