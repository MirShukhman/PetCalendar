import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    
    const handleLogin = () => {
        //some login logic
        setIsLoggedIn(true);
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