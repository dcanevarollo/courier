import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../contexts/auth';

import { Container } from './styles';

export default function Chats() {
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
}
