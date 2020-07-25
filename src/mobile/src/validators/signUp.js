import * as Yup from 'yup';

export const firstStepValidator = Yup.object().shape({
  phone_number: Yup.string().required('Provide a phone number'),
});

export const secondStepValidator = Yup.object().shape({
  about: Yup.string().notRequired(),
  name: Yup.string().required('Provide a name'),
});
