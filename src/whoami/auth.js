// manages static user data (hydrated on login and not expected to change for a session) & cookies.

import jscookie from 'js-cookie';
import { checkIsNullOrUndefinedOrEmpty } from '../utils/utlis';

class Auth {
    constructor() {
        this.authenticated =
            localStorage.getItem('stay') === 'true' ? true : false;
        this.user = null;
        this.userID = -1;
        this.email = '';
        this.password = '';
        this.sessionToken = '';
        this.currentReCAPTCHA = null;
        this.stay = false;
    }
    /**
     *
     *
     * @param {*} user
     * @memberof Auth
     */
    login(user) {
        this.authenticated = true;
        this.user = user;
        this.stay = user.stay;
        if (user?.uid) {
            jscookie.set('user', btoa(user.uid));
            this.userID = user.uid;
        }
        if (user?.stay) {
            localStorage.setItem('stay', 'true');
        }
    }

    logout() {
        this.authenticated = false;
        this.userID = -1;
        this.email = '';
        this.password = '';
        this.destroySession();
        localStorage.removeItem('stay');
    }

    isAuthenticated() {
        return this.authenticated;
    }

    /**
     * set credentials pre-login to be used for auth
     *
     * @param {*} _email
     * @param {*} _password
     * @memberof Auth
     */
    setCredentials(_email, _password) {
        this.email = _email;
        this.password = btoa(_password);
    }

    getUserID() {
        return this.userID;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    /**
     *
     *
     * @param {string} token
     * @memberof Auth
     */
    createSession(token) {
        this.sessionToken = token;
        jscookie.set('token', token);
    }

    isSessionHydrated() {
        let id = jscookie.get('user') || '';
        let token = jscookie.get('token') || '';
        if (
            checkIsNullOrUndefinedOrEmpty(id) ||
            checkIsNullOrUndefinedOrEmpty(token)
        ) {
            return false;
        }

        this.userID = atob(id);
        this.sessionToken = token;

        return true;
    }

    destroySession() {
        this.sessionToken = '';
        jscookie.remove('user');
        jscookie.remove('token');
    }

    getSessionToken() {
        return this.sessionToken;
    }

    setReCAPTCHA(captcha) {
        this.currentReCAPTCHA = captcha;
    }

    getReCAPTCHA() {
        return this.currentReCAPTCHA;
    }
}

export default new Auth();
