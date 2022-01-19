import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './main';
import Search from './search';
import { connectToStore } from '../helpers';
import MovieDetail from '../components/movie-detail';

const {Navigator, Screen} = createNativeStackNavigator();

const Screens = ({ setNetwork }) => {

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      setNetwork(state => ({
        ...state,
        isConnected: networkState.isConnected,
      }));
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Navigator initialRouteName="main">
          <Screen name="main" component={Main} options={{ headerShown: false }} />
          <Screen name="search" component={Search} options={{ headerShown: false }} />
        </Navigator>
      </NavigationContainer>
      <MovieDetail />
    </>
  );
};

export default connectToStore(
  {},
  ['network'],
)(Screens);
