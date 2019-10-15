import { put, post, get } from './api';

export const signUpStep1 = (data) => post('access/v1/createuser/', data);

export const signUpStep2 = (data) => put('access/v1/createuser/', data);

export const getUserInfo = () => get('access/v1/createuser/');

export const signIn = (data) => post('access/v1/login/', data);

export const getNetwork = (data) => get('network/v1/network/', data);

export const addNetwork = (data) => post('network/v1/network/', data);

export const tagNetwork = (data) => post('network/v1/tagging/', data);

export const getTaggedNetwork = () => get('network/v1/tagging/');

export const addAchievement = (data) => post('access/v1/upload_achievements/', data);

export const redeemPoints = () => post('transaction/v1/redeem_points/');

export const uploadKYC = (data) => post('access/v1/upload_kyc/', data);

export const getBankList = (data) => get('transaction/v1/bank/', data);

export const addBankAccount = (data) => post('transaction/v1/bank_account/', data);

export const getBankDetails = () => get('transaction/v1/bank_account/');
