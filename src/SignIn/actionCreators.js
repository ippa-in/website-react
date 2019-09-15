import { SIGN_IN } from './actionTypes';

export const signIn = (payload) => {
    return { type: SIGN_IN, payload }
}