import React from 'react';

import { useChats } from '../../contexts/chats';

import Header from '../../components/Header';

import { Container } from './styles';

export default function Conversation() {
  const { currentChat } = useChats();

  return (
    <Container>
      <Header
        title={currentChat.receiver.name}
        figure={currentChat.receiver.picture?.url}
        rightSide={false}
      />
    </Container>
  );
}
