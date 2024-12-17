
/*
    The reducer takes the current state and an action
    It decides how to update the state according to the type and payload.

    In this case, the reducer would state of [], then when the action {type: 'SET_PETS', payload:newPetsArray} is sent,
    the redux would update the state by the value that the reducer returns, which in this case would be newPetsArray.

    the ./actions/petsActions.js defines how the whole operation occurs
*/

const initialState =[];

const petsReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_PETS':
            return action.payload;
        default:
            return state;
    }
}

export const setPets = (pets) => ({
    type: 'SET_PETS',
    payload: pets
});

export default petsReducer;