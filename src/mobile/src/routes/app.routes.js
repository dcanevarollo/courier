import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon } from '@expo/vector-icons';

import Calls from '../pages/Calls';
import Chats from '../pages/Chats';
import Conversation from '../pages/Conversation';
import Settings from '../pages/Settings';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  box: {
    borderStyle: 'solid',
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontFamily: 'SourceSansPro_700Bold',
    fontSize: 28,
    lineHeight: 35,
  },
  headerRightContainer: {
    paddingRight: 20,
  },
  tabBar: {
    height: 80,
    paddingHorizontal: '8%',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
});

const ChatsStack = createStackNavigator();

function ChatsStackScreen() {
  return (
    <ChatsStack.Navigator
      screenOptions={{
        headerStyle: [styles.box, styles.header],
        headerTintColor: colors.black,
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerRightContainerStyle: styles.headerRightContainer,
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="user-plus" size={28} color={colors.primaryBlue} />
          </TouchableOpacity>
        ),
      }}
    >
      <ChatsStack.Screen name="Chats" component={Chats} />
      <ChatsStack.Screen name="Conversation" component={Conversation} />
    </ChatsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
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
        style: [styles.box, styles.tabBar],
      }}
    >
      <Tab.Screen name="Calls" component={Calls} />
      <Tab.Screen name="Chats" component={ChatsStackScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
