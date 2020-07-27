import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import OutlineButton from '../../components/OutlineButton';

import {
  Container,
  Header,
  Logo,
  Greeting,
  Salutation,
  ActionsContainer,
  Row,
  BodyText,
  SignUpLink,
} from './styles';
import colors from '../../styles/colors';

import logo from '../../../assets/icon/foreground.png';

export default function Welcome({ navigation }) {
  return (
    <Container colors={[colors.primaryGreen, colors.primaryBlue]}>
      <StatusBar style="light" />

      <Header>
        <Logo source={logo} />
        <Greeting>Hello!</Greeting>
        <Salutation>Welcome to Courier!</Salutation>
      </Header>

      <ActionsContainer>
        <OutlineButton
          color="white"
          label="sign in"
          width="260px"
          onPress={() => navigation.navigate('SignIn')}
        />

        <Row>
          <BodyText>Don&apos;t have an account?</BodyText>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SignUp')}
          >
            <SignUpLink>Sign up!</SignUpLink>
          </TouchableOpacity>
        </Row>
      </ActionsContainer>
    </Container>
  );
}
