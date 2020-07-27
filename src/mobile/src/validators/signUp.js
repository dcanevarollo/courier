import * as Yup from 'yup';

export const firstStepValidator = Yup.object().shape({
  phone: Yup.string().required('Provide a phone number'),
});

export const secondStepValidator = Yup.object().shape({
  name: Yup.string().required('Provide a name'),
  password: Yup.string()
    .required('Provide a password')
    .min(6, 'At least 6 characters'),
  about: Yup.string().notRequired(),
});
