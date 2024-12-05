import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from './Header';

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