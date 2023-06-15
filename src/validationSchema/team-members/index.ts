import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  permissions: yup.string(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
