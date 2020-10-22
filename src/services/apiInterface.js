// A reusable promise-based interface to manage api calls.

import api, { dispatcherService, apiErrorMsg, CancelToken } from './api';

class ApiInterface {
    constructor() {
        this.CancelToken = CancelToken;
    }

    getErrorMessage(error) {
        let err = error?.response || error;
        let info = err?.data?.info || apiErrorMsg;
        if (err.status >= 500) {
            info = apiErrorMsg;
        }
        return new Error(info);
    }

    login(data, cancelToken) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not Implemented'));
        });
    }
    createUser(data, cancelToken) {
        return new Promise((resolve, reject) => {
            api.post('/users', { ...data }, { cancelToken })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(this.getErrorMessage(err));
                });
        });
    }

    updateUser({ uid, email, username, password }, cancelToken) {
        return new Promise((resolve, reject) => {
            api.patch(
                '/users/' + uid,
                { email, username, password },
                { cancelToken }
            )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(this.getErrorMessage(err));
                });
        });
    }

    // also used for login since it can return a token without mutating data
    getConfig({ isAuth }, cancelToken) {
        return new Promise((resolve, reject) => {
            api.get('/config', { isAuthorization: isAuth, cancelToken })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(this.getErrorMessage(err));
                });
        });
    }
    setConfig({ config }, cancelToken) {
        return new Promise((resolve, reject) => {
            api.put('/config', { ...config }, { cancelToken })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(this.getErrorMessage(err));
                });
        });
    }

    pullLogs() {
        return new Promise((resolve, reject) => {
            dispatcherService
                .get('/log')
                .then((res) => {
                    const logs = res.data.LOG;
                    resolve(logs);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    pullSessions() {
        return new Promise((resolve, reject) => {
            dispatcherService
                .get('/registeredsessions')
                .then((res) => {
                    const sessions = res.data['Connected Applications'];
                    resolve(sessions);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default new ApiInterface();
