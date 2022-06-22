import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { createBrowserHistory } from 'history';

export const createRequestParams = (queryParams?: any): any => {
  if (!queryParams) {
    return {};
  }
  const {
    first,
    page,
    sortField,
    sortOrder,
    pageSize: size,
    optionalFilters,
    columns,
    ...mandatoryFilters
  } = queryParams;
  let pagination = {};
  let search = {};
  let sort = {};

  if (page !== undefined) {
    pagination = {
      page: page + 1,
      size,
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
    columns,
  };
};

export const stringDefaultFilter = {
  operator: FilterOperator.AND,
  constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
};

export type IQueryParams = {
  first?: number;
  pageSize?: number;
  page?: number;
  optionalFilters?: DataTableFilterMeta | undefined;
  sortOrder?: any;
  sortField?: string;
};

export type IApiParams = {
  queryParams?: any; // query params like page, size, sort, field filters on query data
  onSuccess?: any; // On success callback on mutation and query
  onError?: any; // On error callback on mutation and query
};

export const setupInterceptor = (onUnauthenticated: any) => {
  const onRequest = (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => {
    return response.data;
  };
  const onResponseError = (error: AxiosError) => {
    if (error && error.response?.status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(error.response?.data);
  };
  axios.interceptors.request.use(onRequest);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export const onAuthCall = (callback) => callback();
export const history = createBrowserHistory();
export const VALID_EMAIL_PATTERN =
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const USER_STORAGE_KEY = 'AUTHENITCATION';
export const TOKEN_STORAGE_KEY = 'AUTH_TOKEN';
export const PAGE_SIZE_OPTIONS = [3, 5, 10];
