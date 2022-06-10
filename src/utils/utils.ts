import axios, { AxiosError } from 'axios';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { createBrowserHistory } from 'history';

export const createRequestParams = (queryParams: any): any => {
  const {
    first,
    page,
    sortField,
    sortOrder,
    rows: perPage,
    optionalFilters,
    ...mandatoryFilters
  } = queryParams;
  let pagination = {};
  let search = {};
  let sort = {};

  if (page !== undefined) {
    pagination = {
      page: page + 1,
      perPage,
    };
  }

  if (optionalFilters && Object.keys(optionalFilters).length) {
    Object.keys(optionalFilters).forEach((k) => {
      optionalFilters[k].constraints.forEach((c) => {
        if (c.value) {
          search[k] = c.value;
        }
      });
    });
  }

  if (sortField) {
    sort = { sortField, sortOrder: sortOrder === 1 ? 'ASC' : 'DESC' };
  }

  return {
    ...pagination,
    ...search,
    ...mandatoryFilters,
    ...sort,
  };
};

export const stringDefaultFilter = {
  operator: FilterOperator.AND,
  constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
};

export type IQueryParams = {
  first?: number;
  rows?: number;
  page?: number;
  optionalFilters?: DataTableFilterMeta | undefined;
  sortOrder?: any;
  sortField?: string;
};

export type IApiParams = {
  queryParams?: any;
  onSuccess?: any;
  onError?: any;
};

export const setupInterceptor = (onUnauthenticated: any) => {
  console.log('setup called');
  axios.interceptors.response.use(
    (response) => {
      console.log('intecepting..');

      return response.data;
    },
    (error: AxiosError) => {
      console.log(error);
      if (error && error.response?.status === 401) {
        onUnauthenticated();
      }
      return Promise.reject(error.response?.data);
    },
  );
};

export const onAuthCall = (callback) => callback();
export const history = createBrowserHistory();
