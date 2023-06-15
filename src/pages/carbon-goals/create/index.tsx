import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCarbonGoal } from 'apiSdk/carbon-goals';
import { Error } from 'components/error';
import { carbonGoalValidationSchema } from 'validationSchema/carbon-goals';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { CarbonGoalInterface } from 'interfaces/carbon-goal';

function CarbonGoalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CarbonGoalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCarbonGoal(values);
      resetForm();
      router.push('/carbon-goals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarbonGoalInterface>({
    initialValues: {
      reduction_goal: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: carbonGoalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Carbon Goal
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="reduction_goal" mb="4" isInvalid={!!formik.errors?.reduction_goal}>
            <FormLabel>Reduction Goal</FormLabel>
            <NumberInput
              name="reduction_goal"
              value={formik.values?.reduction_goal}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('reduction_goal', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.reduction_goal && <FormErrorMessage>{formik.errors?.reduction_goal}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'carbon_goal',
  operation: AccessOperationEnum.CREATE,
})(CarbonGoalCreatePage);
