import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

export const addToOfflineQueue = async (action) => {
    try{
        const queue = JSON.parse(await AsyncStorage.getItem(config.OFFLINE_QUEUE_KEY)) || [];
        queue.push(action);
        await AsyncStorage.setItem(config.OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    }
    catch(error){
        console.error('Error adding to offline queue ', error);
    }
};

export const getOfflineQueue = async () => {
    try{
        return JSON.parse(await AsyncStorage.getItem(config.OFFLINE_QUEUE_KEY)) || [];
    }catch(error){
        console.error('Error fetching offline queue ', error);
    }
};

export const removeFromQueue = async () => {
    try{
        const queue = JSON.parse(await AsyncStorage.getItem(config.OFFLINE_QUEUE_KEY)) || [];
        queue.shift();
        await AsyncStorage.setItem(config.OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    }
    catch(error){
        console.error('Error removing item from queue ', error);
    }
}