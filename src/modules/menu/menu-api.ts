import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Menu } from '.';
import { createRequestParams, IApiParams } from '../../utils/utils';

const resourceUrl = 'api/menus';

/**
 * fetch Menus by page, and optional filters
 * @param IApiParams
 * @returns UseQueryResult
 */
export const useFetchMenus = ({
  queryParams,
  onSuccess,
  onError,
}: IApiParams) => {
  return useQuery<any>(
    ['fetchMenus', queryParams],
    () =>
      axios.get(`${resourceUrl}`, { params: createRequestParams(queryParams) }),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * create new Menu or updated existing Menu
 * Menu to be created or updated is passed to mutate function param
 * @param IApiParams
 * @returns UseMutationResult
 */
export const useCreateOrUpdateMenu = ({ onSuccess, onError }: IApiParams) => {
  return useMutation<Menu, any, Menu>(
    'createMenu',
    (menu: Menu) => (menu.id ? updateMenu(menu) : createMenu(menu)),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * Delete Menu
 * @param IApiParams
 * @returns  UseMutationResult
 */
export const useDeleteMenu = ({ onSuccess, onError }: IApiParams) => {
  return useMutation(
    'deteleMenu',
    (id: number) => axios.delete(`${resourceUrl}/${id}`),
    {
      onSuccess,
      onError,
    },
  );
};

const createMenu = (menu: Menu): any => {
  return axios.post(`${resourceUrl}`, menu);
};

const updateMenu = (menu: Menu): any => {
  return axios.patch(`${resourceUrl}/${menu.id}`, menu);
};
