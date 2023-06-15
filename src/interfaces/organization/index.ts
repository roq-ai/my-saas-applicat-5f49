import { CarbonDataInterface } from 'interfaces/carbon-data';
import { CarbonGoalInterface } from 'interfaces/carbon-goal';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  address?: string;
  industry?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  carbon_data?: CarbonDataInterface[];
  carbon_goal?: CarbonGoalInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    carbon_data?: number;
    carbon_goal?: number;
    team_member?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  address?: string;
  industry?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
