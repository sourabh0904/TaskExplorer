/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { TasksProvider } from './src/context/TasksContext';

function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <AppNavigator />
      </TasksProvider>
    </SafeAreaProvider>
  );
}

export default App;
