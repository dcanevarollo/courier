import React, { useState, useRef } from 'react';
import { Feather as Icon } from '@expo/vector-icons';

import { useChats } from '../../contexts/chats';
import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import Header from '../../components/Header';

import {
  Container,
  Main,
  MessageRow,
  MessageContainer,
  MessageText,
  MessageInfo,
  MessageTime,
  Actions,
  BorderedButton,
  MessageInput,
} from './styles';
import colors from '../../styles/colors';

export default function Conversation() {
  const { currentChat, addMessageToChat } = useChats();
  const { user } = useAuth();

  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef(null);

  async function sendMessage() {
    try {
      const payload = {
        receiver_id: currentChat.receiver.id,
        content: newMessage,
      };

      const { data: generatedMessage } = await api.post('/messages', payload);

      addMessageToChat(currentChat, generatedMessage);

      if (inputRef.current) inputRef.current.clear();
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <Container>
      <Header
        title={currentChat.receiver.name}
        figure={currentChat.receiver.picture?.url}
        showAvatar
      />

      <Main>
        {currentChat.messages.map((message, index) => {
          const fromUser = message.sender_id === user.id;

          const isLastOne = index === currentChat.messages.length - 1;

          return (
            <MessageRow
              key={message.id}
              alignment={fromUser ? 'flex-end' : 'flex-start'}
            >
              <MessageContainer
                colors={fromUser ? colors.mainGradient : colors.grayGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                fromUser={fromUser}
                isLastOne={isLastOne}
              >
                <MessageText fromUser={fromUser}>{message.content}</MessageText>
              </MessageContainer>

              {isLastOne && (
                <MessageInfo fromUser={fromUser}>
                  <Icon
                    name="check"
                    size={12}
                    color={message.read_at ? colors.primaryBlue : colors.gray}
                  />
                  <MessageTime>{message.sent_time}</MessageTime>
                </MessageInfo>
              )}
            </MessageRow>
          );
        })}
      </Main>

      <Actions>
        <BorderedButton underlayColor={colors.lightGray} onPress={() => {}}>
          <Icon name="camera" size={24} color={colors.primaryBlue} />
        </BorderedButton>

        <MessageInput
          ref={inputRef}
          placeholder="Type a message..."
          onChangeText={(text) => setNewMessage(text)}
        />

        <BorderedButton
          underlayColor={colors.lightGray}
          onPress={() => sendMessage()}
        >
          <Icon name="send" size={24} color={colors.primaryBlue} />
        </BorderedButton>
      </Actions>
    </Container>
  );
}
