import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { SemiBold, Regular } from '../../styles/fonts';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Logo = styled.Image`
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
`;

export const Greeting = styled(SemiBold)`
  font-size: 64px;
  line-height: 80px;
  color: white;
`;

export const Salutation = styled(Regular)`
  font-size: 20px;
  line-height: 25px;
  color: white;
`;

export const ActionsContainer = styled.View`
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const BodyText = styled(Regular)`
  font-size: 16px;
  line-height: 20px;
  color: white;
`;

export const SignUpLink = styled(SemiBold)`
  font-size: 16px;
  line-height: 20px;
  color: white;
  margin-left: 6px;
`;
