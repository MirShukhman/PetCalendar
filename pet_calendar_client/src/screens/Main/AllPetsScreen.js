import React, { useState, useContext, useEffect } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import MainScreensWrapper from '../../components/MainScreensWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, deletePet, fetchPetsIfNotLoaded } from '../../store/actions/petsActions';
import { Alert } from 'react-native';

/* Redux explanation notes:
  We use the redux global state in this UI.
  for that we use the react-redux hooks: useDispatch and useSelector
  useDispatch - allows us to execute actions
  useSelector - allows us to fetch data from the state
  
  besides those quirks, the code here is pretty self-explanatory
*/


const AllPetsScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets);

    useEffect(() => {
        dispatch(fetchPetsIfNotLoaded());
    }, [dispatch]);

    const handleDeletePet = (id) => {
      Alert.alert("Are you sure?",
        "Deleting a pet can not be undone",
        [{
          text:"Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch(deletePet(id))
        }
      ],
        { cancelable: true }
      );
    }

    const openAddPetScreen = () => {
        navigation.navigate('SecondaryStack', {
            screen: 'AddPet',
        });
    };


    console.log('Pets data:', pets);
    return (
      <MainScreensWrapper title="My Pets" style={{ flex: 1 }}>
        <Button title="Add Pet" onPress={openAddPetScreen} />
        <View style={styles.petsList}>
          <FlatList
            data={pets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.petBox}>
                <Text>ID: {item.id ?? '-1'}</Text>
                <Text>Type: {item.type ?? 'none'}</Text>
                <Text>Name: {item.name ?? 'none'}</Text>
                <Text>Age: {item.age ?? 'none'}</Text>
                <Text>Color: {item.color ?? 'none'}</Text>
                <Text>Demeanor: {item.demeanor ?? 'none'}</Text>
                <Button title="del" onPress={() => handleDeletePet(item.id)}/>
              </View>
            )}
          />
        </View>
      </MainScreensWrapper>
    );
};


const styles = StyleSheet.create({
    petsList:{
      flex:1,

    },
    petBox:{
      padding:10,
      borderBottomWidth:1,

    },
  });

export default AllPetsScreen;