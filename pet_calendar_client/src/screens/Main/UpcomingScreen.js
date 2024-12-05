import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainScreensWrapper from '../../components/MainScreensWrapper';


const UpcomingScreen = () => {
    return(
        <MainScreensWrapper title="Upcoming">
            <Text>Upcoming screen will tell you the future</Text>
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


export default UpcomingScreen;