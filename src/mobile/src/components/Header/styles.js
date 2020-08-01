import styled from 'styled-components/native';

import { Bold } from '../../styles/fonts';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
`;

export const LeftSide = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Bold)`
  font-size: ${(props) => props.fontSize};
  line-height: 35px;
  color: ${colors.black};
`;
