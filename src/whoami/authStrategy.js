import api from '../services/api';
import auth from './auth';
/* import store from '../store/store';
import * as actionTypes from '../store/actions'; */

class AuthStrategy {
    async doAuth() {
        if (auth.isSessionHydrated()) {
            try {
                let response = await api.get('/config');
                if (response.data.user) {
                    auth.login();
                } else {
                }
            } catch (error) {
                auth.destroySession();
            } finally {
                return true;
            }
        }
    }

    doLogOut() {
        auth.logout();
        // store.dispatch({ type: actionTypes.LOG_OUT });
    }
}

export default new AuthStrategy();
