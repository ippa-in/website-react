import { SET_USER_INFO } from './actionTypes';

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        default: return state;
    }
}

export default profileReducer;
