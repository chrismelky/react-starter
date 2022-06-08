import axios from 'axios';

const resourceUrl = 'api/roles';

export const getRoles = async (opts?: any): Promise<any> => {
  const res = await axios.get(resourceUrl, { params: opts });
  return res.data;
};
