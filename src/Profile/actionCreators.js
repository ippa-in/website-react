import {
    GET_USER_INFO,
    SET_USER_INFO,
    GET_NETWORK_LIST,
    SET_NETWORK_LIST,
    GET_TAGGED_NETWORK,
    SET_TAGGED_NETWORK,
    TAG_NETWORK,
    GET_FILES_URL,
    SET_FILES_URL,
    GET_BANK_LIST,
    SET_BANK_LIST,
    ADD_BANK_ACCOUNT,
    GET_BANK_DETAILS,
    SET_BANK_DETAILS,
    REDEEM_POINTS
} from './actionTypes';

export const getUserInfo = () => ({ type: GET_USER_INFO });

export const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });

export const getNetwork = (payload) => ({ type: GET_NETWORK_LIST, payload });

export const setNetwork = (payload) => ({ type: SET_NETWORK_LIST, payload });

export const getTaggedNetworkList = () => ({ type: GET_TAGGED_NETWORK });

export const setTaggedNetworkList = (payload) => ({ type: SET_TAGGED_NETWORK, payload });

export const tagNetwork = (payload) => ({ type: TAG_NETWORK, payload });

export const redeemPoints = () => ({ type: REDEEM_POINTS });

export const getFilesUrl = (payload) => ({ type: GET_FILES_URL, payload });

export const setFilesUrl = (payload) => ({ type: SET_FILES_URL, payload });

export const getBankList = (payload) => ({ type: GET_BANK_LIST, payload });

export const setBankList = (payload) => ({ type: SET_BANK_LIST, payload });

export const addBankAccount = (payload) => ({ type: ADD_BANK_ACCOUNT, payload });

export const getBankDetails = () => ({ type: GET_BANK_DETAILS });

export const setBankDetails = (payload) => ({ type: SET_BANK_DETAILS, payload });
