import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const AddPetScreen = ({ navigation }) => {
    return(
        <View>
            <Text>Add pet screen</Text>
            <Button title="Add my pet" onPress={ () => navigation.goBack() }/>
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


export default AddPetScreen;