import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from './Header';
/* basically a wrapper that currently defines the header, so this should be the wrapper for any screen with a header.
   other components could be added here to render on all MainStack */
const MainScreensWrapper = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default MainScreensWrapper;