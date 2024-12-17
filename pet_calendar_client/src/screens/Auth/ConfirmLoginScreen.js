import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const ConfirmLoginScreen = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    
    const handleConfirmLogin = () => {
        // go to confirm login api, if everything is setIsLoggedIn would be true and mainStack would show instead.
        // the token would already be auto saved by the api.
        setIsLoggedIn(true);
    }

    return(
        <View>
            <Text>Confirm Login:</Text>
            <Button title="Confirm" onPress={ handleConfirmLogin } />
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


export default ConfirmLoginScreen;