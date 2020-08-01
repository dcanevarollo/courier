import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';

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

  return (
    <ChatContext.Provider
      value={{ chats, currentChat, loading, fetchChats, setCurrentChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);

  return context;
}
