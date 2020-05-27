import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';

import LinkingConfiguration from './navigation/LinkingConfiguration';
import LoginScreen from "./screens/LoginScreen";
import BattleScreen from "./screens/BattleScreen";
import TeamSelectionScreen from "./screens/TeamSelectionScreen";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import reducers from "./reducers";


const Stack = createStackNavigator();
const store = createStore(reducers);

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="TeamSelect" component={TeamSelectionScreen} />
              <Stack.Screen name="Battle" component={BattleScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
