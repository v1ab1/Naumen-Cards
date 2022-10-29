import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';

import { Navigation } from './screens/Navigation';

import React, { useState } from "react";
import { Context } from './Context';

export default function App() {
  const [context, setContext] = useState({});
  
  return ( <Context.Provider value={[context, setContext]}>
            <Navigation />
          </Context.Provider>);
}