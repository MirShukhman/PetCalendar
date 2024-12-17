import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Text, Button, View, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSignUp = () => {
        // call the signup api, if all is ok pass to confirm login

        setEmail("myEmail@mail.com");
        setPhone("0501234567");
        setNickname("Its'a me, Mario");

        navigation.navigate('AuthStack', { screen: 'ConfirmLogin' });
    }

    return(
        <View>
            <Button title="Sign Up" onPress={ handleSignUp } />
            <Text>Go to login screen</Text>
            <Button title="go login" onPress={ () => navigation.navigate('AuthStack', {screen: 'Login'}) } />
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


export default SignupScreen;