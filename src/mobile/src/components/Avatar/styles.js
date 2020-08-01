import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  position: relative;
  margin-right: ${(props) => props.marginRight || 0};
  margin-left: ${(props) => props.marginLeft || 0};
`;

export const Picture = styled.Image`
  border-radius: 35px;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;

export const OnlineBadge = styled.View`
  position: absolute;
  right: 2px;
  bottom: 4px;
  z-index: 1;
  width: 15px;
  height: 15px;
  background: ${colors.primaryGreen};
  border-radius: 7.5px;
  border: 1.5px solid white;
`;
