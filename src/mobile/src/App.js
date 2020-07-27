import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
  });

  useEffect(() => {
    async function keepSplashScreen() {
      await SplashScreen.preventAutoHideAsync();
    }

    keepSplashScreen();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) await SplashScreen.hideAsync();
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
