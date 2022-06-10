import axios from 'axios';
import { useQuery } from 'react-query';
import { createRequestParams } from '../../utils/utils';

const resourceUrl = 'api/roles';

export const useFetchRoles = ({ params, onSuccess, onError }) => {
  return useQuery(
    'fetchRoles',
    () => axios.get(resourceUrl, { params: createRequestParams(params) }),
    { onSuccess, onError },
  );
};
export const getRoles = async (opts?: any): Promise<any> => {
  const res = await axios.get(resourceUrl, { params: opts });
  return res.data;
};
