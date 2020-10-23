import axios from 'axios';
import auth from '../whoami/auth';

export const apiErrorMsg =
    'The server cannot be reached at this time, please try again later.';

export const CancelToken = axios.CancelToken;
// eslint-disable-next-line
const getAuthHeader = () => {
    const email = auth.getEmail();
    const password = atob(auth.getPassword());
    const authHeader = btoa(`${email}:${password}`);
    auth.createSession(authHeader);
    return authHeader;
};

export const dispatcherService = axios.create({
    baseURL: process.env.REACT_APP_DISPATCHER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    responseType: 'json',
    timeout: 6000,
});

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Cache-Control': 'no-cache' },
    responseType: 'json',
    timeout: 6000,
    isDelayed: false,
    isAuthorization: false,
});

service.interceptors.request.use((config) => {
    if (config.isDelayed) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(config), 3000)
        );
    }
    if (config.isAuthorization) {
        config.headers.Authorization = 'V2C ' + getAuthHeader();
    } else {
        // config.headers['X-V2C-Session'] = auth.getSessionToken();
        config.headers.Authorization = 'V2C ' + auth.getSessionToken();
    }

    /*     if (config.hasCAPTCHA) {
        const captcha = auth.getReCAPTCHA();
        config.headers['X-G-RECAPTCHA-RESPONSE'] = captcha;
    } */

    return config;
});

service.interceptors.response.use((config) => {
    if (config.headers['x-v2c-csrf']) {
        auth.createSession(config.headers['x-v2c-csrf']);
    }
    if (config.headers['x-v2c-user']) {
        auth.login({ uid: config.headers['x-v2c-user'] });
    }
    if (config.status === 401) {
        auth.logout();
    }
    return config;
});

export default service;
