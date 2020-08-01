import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const items = await AsyncStorage.multiGet([
        '@courier/access-token',
        '@courier/auth-user',
      ]);

      if (items.length > 0) {
        const storagedToken = items[0][1];
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        const storagedUser = JSON.parse(items[1][1]);
        setAuthUser(storagedUser);

        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  // TODO : handle errors
  async function signIn(data) {
    try {
      const response = await api.post('/login', data);

      const { token, user } = response.data;

      setAuthUser(user);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
        ['@courier/access-token', token.token],
        ['@courier/auth-user', JSON.stringify(user)],
      ]);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function signOut() {
    try {
      await api.delete('/logout');

      await AsyncStorage.clear();

      setAuthUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!authUser, user: authUser, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
