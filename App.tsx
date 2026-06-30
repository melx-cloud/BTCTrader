import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import RootNavigator from './src/navigation/RootNavigator';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </Provider>
    </SafeAreaProvider>
  );
}
