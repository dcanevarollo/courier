import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';
import websocket from '../services/websocket';

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

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        loading,
        fetchChats,
        setCurrentChat,
        addMessageToChat,
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
