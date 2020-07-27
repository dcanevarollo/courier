import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ValidationError } from 'yup';

import { useAuth } from '../../contexts/auth';

import validator from '../../validators/signIn';

import LineInput, { MaskedInput } from '../../components/LineInput';
import GradientButton from '../../components/GradientButton';

import {
  Container,
  PageTitle,
  PageSubtitle,
  FormContainer,
  Form,
  InputsRow,
  ControlsContainer,
  ControlLink,
} from './styles';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);

  const { signIn } = useAuth();

  async function handleSubmit(data) {
    try {
      await validator.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      signIn(data);
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

  return (
    <Container>
      <StatusBar style="dark" />

      <View>
        <PageTitle>Sign In</PageTitle>
        <PageSubtitle>
          Please, type your phone number and your password to access the app.
        </PageSubtitle>
      </View>

      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputsRow>
            <MaskedInput
              name="dial_code"
              width="25%"
              placeholder="+"
              type="custom"
              options={{ mask: '+9999' }}
            />
            <MaskedInput
              name="phone"
              width="70%"
              label="Phone"
              type="cel-phone"
              options={{ dddMask: '99 ' }}
            />
          </InputsRow>
          <LineInput name="password" label="Password" secureTextEntry />
        </Form>
      </FormContainer>

      <ControlsContainer>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <ControlLink>Back</ControlLink>
        </TouchableOpacity>
        <GradientButton
          width="100px"
          label="send"
          onPress={() => formRef.current.submitForm()}
        />
      </ControlsContainer>
    </Container>
  );
}
