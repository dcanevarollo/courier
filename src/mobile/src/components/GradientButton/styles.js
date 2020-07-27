import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

import { Bold } from '../../styles/fonts';

export const Scaffold = styled(LinearGradient)`
  justify-content: center;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: 25px;
  padding: 12px 20px;
`;

export const Label = styled(Bold)`
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 25px;
  text-transform: uppercase;
  color: white;
`;
