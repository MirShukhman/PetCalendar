import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import MainScreensWrapper from '../../components/MainScreensWrapper';


const SettingsScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

    return(
        <MainScreensWrapper title="Settings">
            <Text>Many settings to set you right up</Text>
            <Button title="Sign Out" onPress={ handleSignOut }/>
        </MainScreensWrapper>
    );
};

const styles = StyleSheet.create({
    placeholderStyle:{
      flex:1,
      flexDirection:'column',
      alignItems:'center',
      borderColor:'#00000000',
      borderWidth:1,
    },
  });


export default SettingsScreen;