import React, { useEffect } from 'react';
import { TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useChats } from '../../contexts/chats';

import Avatar from '../../components/Avatar';

import {
  Container,
  ChatBox,
  PreviewContainer,
  Name,
  Preview,
  MetadataContainer,
  Timing,
  UnreadContainer,
  UnreadCounter,
} from './styles';
import colors from '../../styles/colors';

export default function Chats({ navigation }) {
  const { chats, loading, fetchChats, setCurrentChat } = useChats();

  useEffect(() => {
    fetchChats();
  }, []);

  function handleChatSelection(chat) {
    setCurrentChat(chat);

    navigation.navigate('Conversation');
  }

  return (
    <Container>
      <StatusBar style="dark" />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      ) : (
        <FlatList
          style={{ width: '100%' }}
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const lastMessage = item.messages[item.messages.length - 1];

            const unreadNumber = item.messages.reduce((total, message) => {
              if (!message.reat_at) return total + 1;

              return total;
            }, 0);

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleChatSelection(item)}
              >
                <ChatBox>
                  <Avatar
                    uri={item.receiver.picture?.url}
                    size={70}
                    marginRight="20px"
                    online
                  />
                  <PreviewContainer>
                    <Name numberOfLines={1}>{item.receiver.name}</Name>
                    <Preview numberOfLines={2}>{lastMessage.content}</Preview>
                  </PreviewContainer>

                  <MetadataContainer>
                    <Timing>{lastMessage.sent_time}</Timing>
                    {unreadNumber > 0 && (
                      <UnreadContainer colors={colors.mainGradient}>
                        <UnreadCounter>{unreadNumber}</UnreadCounter>
                      </UnreadContainer>
                    )}
                  </MetadataContainer>
                </ChatBox>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Container>
  );
}
