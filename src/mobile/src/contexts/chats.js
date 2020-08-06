import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';
import ws from '../services/websocket';

import { findAndReplace } from '../utils/iterators';

const ChatContext = createContext({});

// TODO : handle errors in API requests
export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchChats() {
    try {
      setLoading(true);

      const response = await api.get('/conversations');

      setChats(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }

  function addMessageToChat(activeChat, newMessage) {
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    });

    setChats(findAndReplace(chats, activeChat, currentChat));
  }

  function subscribeToChat(chat) {
    setCurrentChat(chat);

    const chatChannel =
      ws.getSubscription(`chat:${chat.id}`) || ws.subscribe(`chat:${chat.id}`);

    chatChannel.on('message', (message) => {
      addMessageToChat(chat, message);
    });
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        loading,
        fetchChats,
        addMessageToChat,
        subscribeToChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);

  return context;
}
