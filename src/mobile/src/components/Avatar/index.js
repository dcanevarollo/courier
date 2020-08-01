import React from 'react';

import { Container, Picture, OnlineBadge } from './styles';

import noAvatar from '../../../assets/images/no-avatar.png';

export default function Avatar({ uri, size, marginRight, marginLeft, online }) {
  return (
    <Container marginRight={marginRight} marginLeft={marginLeft}>
      <Picture source={uri ? { uri } : noAvatar} size={size} />
      {online && <OnlineBadge />}
    </Container>
  );
}
