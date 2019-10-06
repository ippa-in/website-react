import { put, post, get } from './api';

export const signUpStep1 = (data) => post('access/v1/createuser/', data);

export const signUpStep2 = (data) => put('access/v1/createuser/', data);

export const getUserInfo = () => get('access/v1/createuser/');

export const signIn = (data) => post('access/v1/login/', data);

export const getNetwork = (data) => get('network/v1/network/', data);

export const addNetwork = (data) => post('network/v1/network/', data);

export const addAchievement = (data) => post('access/v1/upload_achievements/', data);

export const redeemPoints = (data) => get('access/v1/upload_achievements/', data);
