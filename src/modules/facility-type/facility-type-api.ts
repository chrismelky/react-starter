import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { FacilityType } from '.';
import { createRequestParams, IApiParams } from '../../utils/utils';

const resourceUrl = 'api/facility-types';

/**
 * fetch Facility Types by page, and optional filters
 * @param IApiParams
 * @returns UseQueryResult
 */
export const useFetchFacilityTypes = ({
  queryParams,
  onSuccess,
  onError,
}: IApiParams) => {
  return useQuery<any>(
    ['fetchFacilityTypes', queryParams],
    () =>
      axios.get(`${resourceUrl}`, { params: createRequestParams(queryParams) }),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * create new FacilityType or updated existing FacilityType
 * FacilityType to be created or updated is passed to mutate function param
 * @param IApiParams
 * @returns UseMutationResult
 */
export const useCreateOrUpdateFacilityType = ({
  onSuccess,
  onError,
}: IApiParams) => {
  return useMutation<FacilityType, any, FacilityType>(
    'createFacilityType',
    (facilityType: FacilityType) =>
      facilityType.id
        ? updateFacilityType(facilityType)
        : createFacilityType(facilityType),
    {
      onSuccess,
      onError,
    },
  );
};

/**
 * Delete FacilityType
 * @param IApiParams
 * @returns  UseMutationResult
 */
export const useDeleteFacilityType = ({ onSuccess, onError }: IApiParams) => {
  return useMutation(
    'deteleFacilityType',
    (id: number) => axios.delete(`${resourceUrl}/${id}`),
    {
      onSuccess,
      onError,
    },
  );
};

const createFacilityType = (facilityType: FacilityType): any => {
  return axios.post(`${resourceUrl}`, facilityType);
};

const updateFacilityType = (facilityType: FacilityType): any => {
  return axios.put(`${resourceUrl}/${facilityType.id}`, facilityType);
};
