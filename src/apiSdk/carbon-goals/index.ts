import axios from 'axios';
import queryString from 'query-string';
import { CarbonGoalInterface, CarbonGoalGetQueryInterface } from 'interfaces/carbon-goal';
import { GetQueryInterface } from '../../interfaces';

export const getCarbonGoals = async (query?: CarbonGoalGetQueryInterface) => {
  const response = await axios.get(`/api/carbon-goals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarbonGoal = async (carbonGoal: CarbonGoalInterface) => {
  const response = await axios.post('/api/carbon-goals', carbonGoal);
  return response.data;
};

export const updateCarbonGoalById = async (id: string, carbonGoal: CarbonGoalInterface) => {
  const response = await axios.put(`/api/carbon-goals/${id}`, carbonGoal);
  return response.data;
};

export const getCarbonGoalById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/carbon-goals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarbonGoalById = async (id: string) => {
  const response = await axios.delete(`/api/carbon-goals/${id}`);
  return response.data;
};
