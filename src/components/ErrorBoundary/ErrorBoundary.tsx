import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { styles } from './ErrorBoundary.styles';

interface State {
  error: Error | null;
}

// Class component — React error boundaries have no hook equivalent.
class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{error.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
