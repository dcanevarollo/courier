import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon } from '@expo/vector-icons';

import { ChatProvider } from '../contexts/chats';

import Calls from '../pages/Calls';
import Chats from '../pages/Chats';
import Conversation from '../pages/Conversation';
import Settings from '../pages/Settings';

import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === 'Calls') icon = 'phone';
          else if (route.name === 'Chats') icon = 'message-circle';
          else icon = 'settings';

          return <Icon name={icon} size={32} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primaryBlue,
        inactiveTintColor: colors.gray,
        showLabel: false,
        style: {
          height: 80,
          paddingHorizontal: '8%',
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
          borderStyle: 'solid',
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
        },
      }}
    >
      <Tab.Screen name="Calls" component={Calls} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <ChatProvider>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Conversation" component={Conversation} />
      </Stack.Navigator>
    </ChatProvider>
  );
}
