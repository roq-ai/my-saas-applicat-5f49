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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCarbonDataById, updateCarbonDataById } from 'apiSdk/carbon-data';
import { Error } from 'components/error';
import { carbonDataValidationSchema } from 'validationSchema/carbon-data';
import { CarbonDataInterface } from 'interfaces/carbon-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function CarbonDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CarbonDataInterface>(
    () => (id ? `/carbon-data/${id}` : null),
    () => getCarbonDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CarbonDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCarbonDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/carbon-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CarbonDataInterface>({
    initialValues: data,
    validationSchema: carbonDataValidationSchema,
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
            Edit Carbon Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="energy_consumption" mb="4" isInvalid={!!formik.errors?.energy_consumption}>
              <FormLabel>Energy Consumption</FormLabel>
              <NumberInput
                name="energy_consumption"
                value={formik.values?.energy_consumption}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('energy_consumption', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.energy_consumption && (
                <FormErrorMessage>{formik.errors?.energy_consumption}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="waste_production" mb="4" isInvalid={!!formik.errors?.waste_production}>
              <FormLabel>Waste Production</FormLabel>
              <NumberInput
                name="waste_production"
                value={formik.values?.waste_production}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('waste_production', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.waste_production && <FormErrorMessage>{formik.errors?.waste_production}</FormErrorMessage>}
            </FormControl>
            <FormControl id="other_emissions" mb="4" isInvalid={!!formik.errors?.other_emissions}>
              <FormLabel>Other Emissions</FormLabel>
              <NumberInput
                name="other_emissions"
                value={formik.values?.other_emissions}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('other_emissions', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.other_emissions && <FormErrorMessage>{formik.errors?.other_emissions}</FormErrorMessage>}
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'carbon_data',
  operation: AccessOperationEnum.UPDATE,
})(CarbonDataEditPage);
