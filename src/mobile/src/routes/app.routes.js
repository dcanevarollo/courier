import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Conversations from '../pages/Conversations';

const AppStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Conversations" component={Conversations} />
    </AppStack.Navigator>
  );
}
