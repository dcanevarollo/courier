import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-community/picker';
import { ValidationError } from 'yup';

import countriesJSON from '../../utils/countries.json';

import {
  firstStepValidator,
  secondStepValidator,
} from '../../validators/signUp';

import LineInput, { MaskedInput } from '../../components/LineInput';

import {
  Container,
  PageTitle,
  PageSubtitle,
  FormContainer,
  Form,
  PickerBox,
  PickerLine,
  InputsRow,
  ControlsContainer,
  ControlLink,
} from './styles';

export default function SignUp({ navigation }) {
  const formRef = useRef(null);

  const [step, setStep] = useState(0);
  const [subtitle, setSubtitle] = useState('');
  const [data, setData] = useState({});

  // For Picker options
  const [countries, setCountries] = useState([
    { value: '', label: 'Choose...' },
  ]);
  const [countryCode, setCountryCode] = useState('');

  // Controls inputs enabling
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    switch (step) {
      case 0: {
        setSubtitle('Hi! Please, inform your phone number to sign up.');
        break;
      }
      case 1: {
        setSubtitle(
          'What is your name? If you like, tell me a little about you...'
        );
        break;
      }
      case 2: {
        setSubtitle(
          'Now, if you want, choose a nice picture for your friends see who you are!'
        );
        break;
      }
      default:
        break;
    }
  }, [step]);

  useEffect(() => {
    if (countryCode !== '') {
      formRef.current.setFieldValue('dial_code', countryCode);

      setEditable(true);
    } else setEditable(false);
  }, [countryCode]);

  useEffect(() => {
    const countriesData = countriesJSON.map((country) => {
      return { value: country.dial_code, label: country.name };
    });

    setCountries([...countries, ...countriesData]);
  }, []);

  /**
   * Controls step transitions for the form. In the final step, it will submit
   * the form.
   *
   * @param {String} direction  case 'back' return to step before; case
   *                            'forward' advances to next step
   */
  function handleStepChange(direction) {
    /**
     * Validate the current step data and advance.
     *
     * @param {Object} newData    current step data
     * @param {Schema} validator  current step validator
     */
    async function verifyStep(newData, validator) {
      try {
        if (validator) await validator.validate(newData, { abortEarly: false });

        formRef.current.setErrors({});

        setData({ ...data, ...newData });
        setStep(step + 1);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = {};

          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });

          formRef.current.setErrors(errors);
        }
      }
    }

    if (direction === 'back') {
      if (step === 0) navigation.goBack();
      else setStep(step - 1);
    } else if (step < 2) {
      const newData = formRef.current.getData();

      if (step === 0) verifyStep(newData, firstStepValidator);
      else if (step === 1) verifyStep(newData, secondStepValidator);
    } else formRef.current.submitForm();
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  async function handleSubmit() {}

  return (
    <Container>
      <StatusBar style="dark" />

      <View>
        <PageTitle>Sign Up</PageTitle>
        <PageSubtitle>{subtitle}</PageSubtitle>
      </View>

      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
          {step === 0 ? (
            <>
              <PickerBox
                selectedValue={countryCode}
                onValueChange={(item) => setCountryCode(item)}
              >
                {countries.map((item) => (
                  <Picker.Item
                    key={`${item.value}#${item.label}`}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </PickerBox>
              <PickerLine />
              <InputsRow>
                <LineInput
                  name="dial_code"
                  width="25%"
                  placeholder="+"
                  editable={false}
                />
                <MaskedInput
                  name="phone_number"
                  width="70%"
                  placeholder="Phone number"
                  type="cel-phone"
                  options={{ withDDD: countryCode === '+55', dddMask: '99 ' }}
                  editable={editable}
                />
              </InputsRow>
            </>
          ) : step === 1 ? (
            <>
              <LineInput name="name" label="Name" />
              <LineInput name="about" label="About me" />
            </>
          ) : (
            <></>
          )}
        </Form>
      </FormContainer>

      <ControlsContainer>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleStepChange('back')}
        >
          <ControlLink>Back</ControlLink>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleStepChange('forward')}
        >
          <ControlLink advance>{step < 2 ? 'Next' : 'Done!'}</ControlLink>
        </TouchableOpacity>
      </ControlsContainer>
    </Container>
  );
}
