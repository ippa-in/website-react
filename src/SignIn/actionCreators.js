import { SIGN_IN } from './actionTypes';

export const signIn = (payload, fromPage) => {
    return { type: SIGN_IN, payload, fromPage }
}