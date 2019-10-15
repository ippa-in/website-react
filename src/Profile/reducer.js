import {
    SET_USER_INFO,
    SET_FILES_URL,
    SET_BANK_LIST,
    SET_BANK_DETAILS,
    SET_NETWORK_LIST,
    SET_TAGGED_NETWORK
} from './actionTypes';

const initialState = {
    userInfo: {},
    fileUrl: {},
    bankList: [],
    bankDetails: {},
    networkList: [],
    taggedNetworks: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case SET_FILES_URL: {
            return {
                ...state,
                fileUrl: action.payload
            }
        }
        case SET_BANK_LIST: {
            return {
                ...state,
                bankList: action.payload
            }
        }
        case SET_BANK_DETAILS: {
            return {
                ...state,
                bankDetails: action.payload
            }
        }
        case SET_NETWORK_LIST: {
            return {
                ...state,
                networkList: action.payload
            }
        }
        case SET_TAGGED_NETWORK: {
            return {
                ...state,
                taggedNetworks: action.payload
            }
        }
        default: return state;
    }
}

export default profileReducer;
