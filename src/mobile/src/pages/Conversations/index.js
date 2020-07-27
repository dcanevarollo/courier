import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../contexts/auth';

export default function Conversations() {
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
