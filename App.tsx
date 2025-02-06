import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';
import Authentication from './authefication';
import Login from './login';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Authentication />
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

