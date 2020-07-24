import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Regular, SemiBold } from '../../styles/fonts';
import colors from '../../styles/colors';

export const Container = styled.View`
  position: relative;
  justify-content: center;
  width: ${(props) => props.width};
  height: 50px;
  margin: 10px 0;
  background: white;
`;

export const Label = styled(SemiBold)`
  position: absolute;
  text-transform: capitalize;
  left: ${(props) => (props.active || props.valid || props.error ? 0 : '10px')};
  top: ${(props) =>
    props.active || props.valid || props.error ? '-12px' : '12px'};
  font-size: ${(props) =>
    props.active || props.valid || props.error ? '14px' : '20px'};
  color: ${(props) =>
    props.active
      ? colors.primaryBlue
      : props.error
      ? colors.red
      : colors.black};
`;

export const TextInput = styled.TextInput`
  font-family: 'SourceSansPro_400Regular';
  font-size: 18px;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  color: ${colors.darkGray};
`;

export const Border = styled(LinearGradient)`
  width: 100%;
  height: 2px;
`;

export const Error = styled(Regular)`
  position: absolute;
  right: 0;
  bottom: -22px;
  font-size: 14px;
  line-height: 15px;
  color: ${colors.red};
`;
