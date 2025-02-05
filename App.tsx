import React from 'react';
import { SafeAreaView } from 'react-native';
import Authentication from './authefication'; 

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Authentication />
    </SafeAreaView>
  );
};

export default App;

