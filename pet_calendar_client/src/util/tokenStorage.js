import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
    try{
        await AsyncStorage.setItem('userToken', token);
    } catch (error){
        console.error('Failed to save token ', error);
    }
};

export const getToken = async () => {
    try{
        return await AsyncStorage.getItem('userToken');
    } catch (error){
        console.error('Failed to get token ', error);
    }
};

export const clearToken = async () => {
    try{
        await AsyncStorage.removeItem('userToken');
    } catch (error){
        console.error('Failed to clear token ', error);
    }
};