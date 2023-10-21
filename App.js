import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/Routes/Navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Navigation />
  );
}