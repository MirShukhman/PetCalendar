import axiosInstance from "./apiService";


/* user credentials end-points */
export const login = async (loginData) => {
    try{
        const response = await axiosInstance.post('/login', loginData);
        return {status: response.status, data: response.data };
    }
    catch(error){
        return {
            status: error.response?.status,
            error: error.response?.data?.err_type || 'Something went wrong in \\confirm_login',
        };
    }
};

export const signup = async (signupData) => {
    try{
        const response = await axiosInstance.post('/signup', signupData);
        return response.data;
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\signup'};
    }
};

export const confirmLogin = async (loginData) => {
    try{
        const response = await axiosInstance.post('/confirm_login', loginData);
        return response.data;
    }
    catch(error){
        return {error: error.response?.data || 'Something went wront in \\confirm_login'};
    }
};

export const logout = async () => {
    try{
        const response = await axiosInstance.delete('/logout');
        return response.data;
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\logout'};
    }
};



/* pets syncing end-points */

export const addPet = async (petData) => {
    try{
        const response = await axiosInstance.post('/signup', signupData);
        return response.data;
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\signup'};
    }
};

export const restorePetData = async () => {
    try{
        const response = await axiosInstance.get('/restore_pet_data');
        return response.data; // This is the dictionary { pet_data: [ {ID: 1, Name: myDog, Type: Dog, ...}, {ID:2, Name: myCat, Type: Cat, ...} ] }
                              // Note that the ID here is the Server ID! if I am stupid and program this incorrectly later, I will physically attack!
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\signup'};
    }
};

export const updatePet = async (petServerID, petData) => {
    try{
        const response = await axiosInstance.put(`/update_pet/${petServerID}`, {pet_data: petData} );
        return response.data;
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\signup'};
    }
};

export const deletePet = async (petServerID) => {
    try{
        const response = await axiosInstance.delete(`/delete_pet/${petServerID}`);
        return response.data;
    }
    catch(error){
        return{ error: error.response?.data || 'Something went wrong in \\signup'};
    }
};

/* user control end-points */

