import * as yup from 'yup';
import { carbonDataValidationSchema } from 'validationSchema/carbon-data';
import { carbonGoalValidationSchema } from 'validationSchema/carbon-goals';
import { teamMemberValidationSchema } from 'validationSchema/team-members';

export const organizationValidationSchema = yup.object().shape({
  address: yup.string(),
  industry: yup.string(),
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  carbon_data: yup.array().of(carbonDataValidationSchema),
  carbon_goal: yup.array().of(carbonGoalValidationSchema),
  team_member: yup.array().of(teamMemberValidationSchema),
});
