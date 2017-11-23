import { USER_LOGGED_IN, USER_LOGGED_OUT} from '../types';
import api from '../api';

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const login = (credentials) => (dispatch) =>
    api.user.login(credentials).then(user => {
        localStorage.accountDetails = JSON.stringify(user.accountDetails);
        dispatch(userLoggedIn(user));
    });

export const logout = (credentials) => (dispatch) => {
    localStorage.removeItem("accountDetails");
    dispatch(userLoggedOut());
};
