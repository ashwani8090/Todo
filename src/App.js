import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import Appnavigator from './navigators/app-navigator'


const App = () => {

  useEffect(()=>{
    SplashScreen.hide();
  },[])

  return (
  <SafeAreaProvider >
    <Appnavigator />
  </SafeAreaProvider>)
}


export default App;
