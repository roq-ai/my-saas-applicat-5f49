import * as yup from 'yup';

export const carbonDataValidationSchema = yup.object().shape({
  energy_consumption: yup.number().integer(),
  waste_production: yup.number().integer(),
  other_emissions: yup.number().integer(),
  organization_id: yup.string().nullable().required(),
});
