import {
    SET_NAVIGATION_DATA,
    SET_CONTAINER_DATA
} from './actions';

const initialState = {
    navigationData: [],
    containerData: [],
}

const AdminReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_NAVIGATION_DATA: {
            return {
                ...state,
                navigationData: action.payload
            }
        }
        case SET_CONTAINER_DATA: {
            return {
                ...state,
                containerData: action.payload
            }
        }

        default: return state;
    }
}

export default AdminReducer;