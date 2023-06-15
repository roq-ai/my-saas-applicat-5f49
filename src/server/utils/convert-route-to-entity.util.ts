const mapping: Record<string, string> = {
  'carbon-data': 'carbon_data',
  'carbon-goals': 'carbon_goal',
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
