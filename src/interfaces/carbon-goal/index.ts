import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CarbonGoalInterface {
  id?: string;
  organization_id: string;
  reduction_goal: number;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CarbonGoalGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
