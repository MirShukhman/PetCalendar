import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../api/endPoints';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleLogin = async () => {
        //call the login api, if all is ok - go to confirm login

        setEmail("myEmail@mail.com");
        setPhone("0501234567");

        const result = await login({ email, phone });
        if(result.status === 201){
            navigation.navigate('AuthStack', { screen: 'ConfirmLogin' });
        }else if(result.status === 400){
            Alert.alert('Error', 'Bad request. Please check your input.');
        }else if(result.status === 401){
            Alert.alert('Unauthorized', 'Incorrect credentials. Please try again.');
        }else if(result.status === 500){
            Alert.alert('Server Error', 'An internal server error occurred. Please try again later.');
        }else{
            Alert.alert('Error', result.error || 'An unknown error occurred.');
        }

    }

    return(
        <View>
            <Button title="Log In" onPress={ handleLogin } />
            <Text>Go to signup screen</Text>
            <Button title="go signup" onPress={ () => navigation.navigate('AuthStack', {screen: 'Signup'}) } />
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


export default LoginScreen;