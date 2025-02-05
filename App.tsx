import React from 'react';
import { SafeAreaView } from 'react-native';
import Authentication from './authefication';
import Login from './login';
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
  <Authentication></Authentication>
 <Login></Login> 
  
   
    </SafeAreaView>
  );
};

export default App;

