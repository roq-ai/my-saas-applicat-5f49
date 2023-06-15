import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CarbonDataInterface {
  id?: string;
  organization_id: string;
  energy_consumption?: number;
  waste_production?: number;
  other_emissions?: number;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CarbonDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
