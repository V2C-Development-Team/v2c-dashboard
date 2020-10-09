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
    return authHeader;
};

export const dispatcherService = axios.create({
    baseURL: process.env.REACT_APP_DISPATCHER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    responseType: 'json',
    timeout: 60000,
});

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Cache-Control': 'no-cache' },
    responseType: 'json',
    timeout: 60000,
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
        config.headers.Authorization = 'Basic ' + getAuthHeader();
    } else {
        config.headers['X-Access-Token'] = auth.getSessionToken();
    }

    /*     if (config.hasCAPTCHA) {
        const captcha = auth.getReCAPTCHA();
        config.headers['X-G-RECAPTCHA-RESPONSE'] = captcha;
    } */

    return config;
});

service.interceptors.response.use((config) => {
    if (config.headers['x-access-token']) {
        auth.createSession(config.headers['x-access-token']);
    }
    if (config.status === 401) {
        auth.logout();
    }
    return config;
});

export default service;
