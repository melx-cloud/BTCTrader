import React, { FC } from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { SCREENS, ScreenName } from './routes';

// Registry seam — no nav library installed yet; add a screen by adding a SCREENS entry + a line here.
const screens: Record<ScreenName, FC> = {
  [SCREENS.HOME]: HomeScreen,
};

export interface RootNavigatorProps {
  initialRoute?: ScreenName;
}

const RootNavigator: FC<RootNavigatorProps> = ({ initialRoute = SCREENS.HOME }) => {
  const Screen = screens[initialRoute];
  return <Screen />;
};

export default RootNavigator;
