import {
    SET_USER_INFO,
    SET_KYC_DETAILS,
    SET_BANK_LIST,
    SET_BANK_DETAILS,
    SET_NETWORK_LIST,
    SET_TAGGED_NETWORK,
    SET_ALL_TRANSACTION
} from './actionTypes';

const initialState = {
    userInfo: {},
    kycDetails: {},
    bankList: [],
    bankDetails: {},
    networkList: [],
    taggedNetworks: [],
    allTransactions: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case SET_KYC_DETAILS: {
            return {
                ...state,
                kycDetails: action.payload
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
        case SET_ALL_TRANSACTION: {
            return {
                ...state,
                allTransactions: action.payload
            }
        }
        default: return state;
    }
}

export default profileReducer;
