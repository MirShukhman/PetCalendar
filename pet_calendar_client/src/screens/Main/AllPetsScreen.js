import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MainScreensWrapper from '../../components/MainScreensWrapper';


const AllPetsScreen = ({ navigation }) => {

    const openAddPetScreen = () => {
        navigation.navigate('SecondaryStack', {
            screen: 'AddPet',
        });
    };

    return(
        <MainScreensWrapper title="All Pets"> 
            <Text>Here be all pets in the whole world ever!</Text>
            <Button title="Add Pet" onPress={openAddPetScreen}/>
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

export default AllPetsScreen;