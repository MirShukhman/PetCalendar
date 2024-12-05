import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Text, Button, View, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    
    const handleSignUp = () => {
        //some login logic
        setIsLoggedIn(true);
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