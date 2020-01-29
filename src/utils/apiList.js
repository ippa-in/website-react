import { put, post, get } from './api';

export const signUpStep1 = (data) => post('access/v1/createuser/', data);

export const updateUserDetails = (data) => put('access/v1/createuser/', data);

export const getUserInfo = () => get('access/v1/createuser/');

export const signIn = (data) => post('access/v1/login/', data);

export const getNetwork = (data) => get('network/v1/network/', data);

export const addNetwork = (data) => post('network/v1/network/', data);

export const tagNetwork = (data) => post('network/v1/tagging/', data);

export const getTaggedNetwork = () => get('network/v1/tagging/');

export const addAchievement = (data) => post('access/v1/upload_achievements/', data);

export const redeemPoints = () => post('transaction/v1/redeem_points/');

export const uploadKYC = (data) => post('access/v1/upload_kyc/', data);

export const getKYCDetails = () => get('access/v1/upload_kyc/');

export const getBankList = (data) => get('transaction/v1/bank/', data);

export const addBankAccount = (data) => post('transaction/v1/bank_account/', data);

export const getBankDetails = () => get('transaction/v1/bank_account/');

export const getAllTransactions = (data) => get('transaction/v1/redeem_points/', data);

export const getNavigationBarData = () => get('content/v1/navigation_bar/');

export const getFilterData = (data) => get('filter/v1/search_fields/', data);

export const getContainerData = (data) => get('filter/v1/filter/', data);

export const addCarouselData = (data) => post('content/v1/dashboard_image/', data);

export const getCarouselData = () => get('content/v1/dashboard_image/');

export const updateCarouselData = (data) => post('content/v1/update_dashboard_image/', data);

export const deleteSwapCarouselData = (data) => put('content/v1/dashboard_image/', data);
