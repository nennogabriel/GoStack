import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { View, StatusBar } from 'react-native';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#312e38',
        }}
      >
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
