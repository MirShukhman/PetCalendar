import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const PetProfileScreen = () => {
    return(
        <View>
            <Text>See your pets profile</Text>
        </View>
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


export default PetProfileScreen;