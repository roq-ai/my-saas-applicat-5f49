import * as yup from 'yup';

export const carbonGoalValidationSchema = yup.object().shape({
  reduction_goal: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
