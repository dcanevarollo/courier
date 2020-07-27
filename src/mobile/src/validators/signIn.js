import * as Yup from 'yup';

const signInValidator = Yup.object().shape({
  dial_code: Yup.string().required('Required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().required('Password is required'),
});

export default signInValidator;
