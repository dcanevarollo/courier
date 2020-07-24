import * as Yup from 'yup';

export const firstStepValidator = Yup.object().shape({
  phone_number: Yup.string().required('Provide a phone number'),
});
