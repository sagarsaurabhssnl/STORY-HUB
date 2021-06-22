import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import write from './screens/write';
import read from './screens/read';

export default function App() {
  const main = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <main.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ }) => {
            if (route.name === 'Read') {
              return <Image source={require('./assets/read.png')} style={{ height: 20, width: 20 }} />;
            } else if (route.name === 'Write') {
              return <Image source={require('./assets/write.png')} style={{ height: 20, width: 20 }} />
            }
          },
        })}
      >
        <main.Screen name={"Write"} component={write} />
        <main.Screen name={"Read"} component={read} />
      </main.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
