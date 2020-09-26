// A reusable promise-based interface to manage api calls.

import api, { apiErrorMsg, CancelToken } from './api';

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
        return new Promise(async (resolve, reject) => {
            reject(new Error('Not Implemented'));
        });
    }

    pullLogs(cancelToken) {
        return new Promise(async (resolve, reject) => {
            api.get('/v1/logs').then((res) => {
                const logs = res.data.LOG;
            });
        });
    }
}

export default new ApiInterface();
