import axios from 'axios';
import queryString from 'query-string';
import { CarbonDataInterface, CarbonDataGetQueryInterface } from 'interfaces/carbon-data';
import { GetQueryInterface } from '../../interfaces';

export const getCarbonData = async (query?: CarbonDataGetQueryInterface) => {
  const response = await axios.get(`/api/carbon-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarbonData = async (carbonData: CarbonDataInterface) => {
  const response = await axios.post('/api/carbon-data', carbonData);
  return response.data;
};

export const updateCarbonDataById = async (id: string, carbonData: CarbonDataInterface) => {
  const response = await axios.put(`/api/carbon-data/${id}`, carbonData);
  return response.data;
};

export const getCarbonDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/carbon-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarbonDataById = async (id: string) => {
  const response = await axios.delete(`/api/carbon-data/${id}`);
  return response.data;
};
