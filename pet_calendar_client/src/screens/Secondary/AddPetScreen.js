import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPetTypes } from '../../store/actions/petTypesActions';
import { addPet } from '../../store/actions/petsActions';

const AddPetScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [demeanor, setDemeanor] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const petTypes = useSelector((state) => state.petTypes);

  React.useEffect(() => {
    dispatch(fetchPetTypes());
  }, [dispatch]);

  const handleAddPet = () => {
    if (!name || !type || !age || !color || !demeanor) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const newPet = {
      name,
      type,
      age: parseInt(age, 10), // Ensure age is an integer
      color,
      demeanor,
    };

    dispatch(addPet(newPet));
    Alert.alert('Success', 'Pet added successfully!');
    
    navigation.goBack();
  };

  const renderPetTypeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.petTypeOption}
      onPress={() => {
        setType(item.name);
        setIsModalVisible(false);
      }}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Pet</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter pet's name"
      />

      <Text style={styles.label}>Type</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsModalVisible(true)}
      >
        <Text>{type || 'Select a type'}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <FlatList
            data={petTypes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPetTypeItem}
          />
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter pet's age"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Enter pet's color"
      />

      <Text style={styles.label}>Demeanor</Text>
      <TextInput
        style={styles.input}
        value={demeanor}
        onChangeText={setDemeanor}
        placeholder="Enter pet's demeanor"
      />

      <Button title="Add Pet" onPress={handleAddPet} />
      <Button title="Back" onPress={() => navigation.goBack()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'gray',
    margin: 20,
    marginTop:200,
    borderRadius: 10,
    padding: 10,
    width:200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  petTypeOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AddPetScreen;