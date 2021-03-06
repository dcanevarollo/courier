import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Picker } from '@react-native-community/picker';
import { ValidationError } from 'yup';

import api from '../../services/api';

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
  PictureBorder,
  Picture,
} from './styles';
import colors from '../../styles/colors';

export default function SignUp({ navigation }) {
  const formRef = useRef(null);

  // User picture choice
  const [picture, setPicture] = useState(null);

  async function handleChoosePicture() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) setPicture(result.uri);
    } catch (error) {
      console.log(error);
    }
  }

  // Step visualization items
  const [step, setStep] = useState(0);
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    switch (step) {
      case 0: {
        setSubtitle('Hi! Please, inform your phone number to sign up.');
        break;
      }
      case 1: {
        setSubtitle(
          'Type your name and a password to access the app. If you like, tell me a little about you too...'
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

  // For Picker options
  const [countries, setCountries] = useState([
    { value: '', label: 'Choose...' },
  ]);
  const [countryCode, setCountryCode] = useState('');

  // Controls inputs enabling
  const [editable, setEditable] = useState(false);

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

  const [data, setData] = useState({});

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

  async function handleSubmit() {
    try {
      data.phone = `${data.dial_code} ${data.phone}`;

      console.log(data);

      delete data.dial_code;

      const response = await api.post('/users', data);

      const uri = Constants.platform.ios
        ? picture
        : picture.replace('file:///', 'file:/');

      const userId = response.data;

      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append('file', { uri, type: 'image/jpeg', name: 'avatar' });

      await api.post('/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { entity: 'user', id: userId },
      });

      formRef.current.reset();

      navigation.reset({
        index: 1,
        routes: [{ name: 'Welcome' }, { name: 'SignIn' }],
      });
    } catch (error) {
      if (error.response) console.error(error.response.data);
      else console.log(error);
    }
  }

  return (
    <Container>
      <StatusBar style="dark" />

      <View>
        <PageTitle>Sign Up</PageTitle>
        <PageSubtitle step={step}>{subtitle}</PageSubtitle>
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
                  name="phone"
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
              <LineInput name="password" label="Password" secureTextEntry />
              <LineInput name="about" label="About me" />
            </>
          ) : (
            <>
              <PictureBorder
                colors={[colors.primaryGreen, colors.primaryBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={handleChoosePicture}
                >
                  {!picture ? (
                    <Icon name="camera" size={60} color={colors.primaryBlue} />
                  ) : (
                    <Picture source={{ uri: picture }} />
                  )}
                </TouchableOpacity>
              </PictureBorder>
            </>
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
          activeOpacity={0.8}
          onPress={() => handleStepChange('forward')}
        >
          <ControlLink advance>{step < 2 ? 'Next' : 'Done!'}</ControlLink>
        </TouchableOpacity>
      </ControlsContainer>
    </Container>
  );
}
