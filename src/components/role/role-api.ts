import axios from 'axios';
import { useQuery } from 'react-query';
import { createRequestParams, IApiParams } from '../../utils/utils';

const resourceUrl = 'api/roles';

export const useFetchRoles = ({
  queryParams,
  onSuccess,
  onError,
}: IApiParams) => {
  return useQuery(
    'fetchRoles',
    () => axios.get(resourceUrl, { params: createRequestParams(queryParams) }),
    { onSuccess, onError },
  );
};
export const getRoles = async (opts?: any): Promise<any> => {
  const res = await axios.get(resourceUrl, { params: opts });
  return res;
};
