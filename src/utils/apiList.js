import { put, post } from './api';

export const signUpStep1 = (data) => post('access/v1/createuser/', data);

export const signUpStep2 = (data) => put('access/v1/createuser/', data);

export const signIn = (data) => post('access/v1/login/', data);