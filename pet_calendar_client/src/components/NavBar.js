import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NavBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.navBarWrapper}>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.4)', 
                'rgba(0,0,0,0)',  
                'rgba(0,0,0,0.4)' 
              ]}
              locations={[0, 0.5, 1]}
              style={styles.overlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              pointerEvents="none"
          />
      <View style={styles.navBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const buttonStyles = [
            styles.navBarButton,
            isFocused ? styles.navBarButtonActive : null,
            index === 0 ? styles.leftMostButton : null,
            index === state.routes.length - 1 ? styles.rightMostButton : null,
          ];

          return (
              <TouchableOpacity key={index} onPress={onPress} style={buttonStyles}>
                  <View style={styles.buttonContent}>
                  {isFocused && (
                      <Image
                      source={require('../assets/images/paw_black.png')}
                      style={styles.pawBackground}
                      />
                  )}
                  <Text style={[styles.navBarButtonText, isFocused && styles.focusedText]}>
                      {label}
                  </Text>
                  </View>
              </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarWrapper:{
    position:'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  navBarContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    overflow: 'hidden',
    borderLeftWidth:0,
    borderRightWidth:0,
    borderWidth: 6,
    borderColor: '#000',
    justifyContent: 'space-between',
  },
  navBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  navBarButtonActive: {
    backgroundColor: '#585858',
  },
  navBarButtonText: {
    fontSize: 14,
    fontWeight:'700',
    color: '#333',
  },
  focusedText: {
    color: '#F5A349',
    fontWeight: 'bold',
  },
  leftMostButton: {

  },
  rightMostButton: {

  },
  pawIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pawBackground: {
    position: 'absolute',
    width: 50,
    height: 50,
    opacity: 0.3,
    resizeMode: 'contain',
  },
});

export default NavBar;