import React from 'react';
import { Text } from 'react-native';

import { useChats } from '../../contexts/chats';

import { Container } from './styles';

export default function Conversation() {
  const { currentChat } = useChats();

  return (
    <Container>
      <Text>{JSON.stringify(currentChat)}</Text>
    </Container>
  );
}
