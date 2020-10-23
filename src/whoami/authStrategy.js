import api from '../services/api';
import auth from './auth';
/* import store from '../store/store';
import * as actionTypes from '../store/actions'; */

class AuthStrategy {
    async doAuth() {
        //demo skip strategy for non-backend users
        if (localStorage.getItem('stay') === 'true') return true;
        if (auth.isSessionHydrated()) {
            try {
                let response = await api.get('/config');
                if (response.data.user) {
                    auth.login();
                } else {
                    auth.logout();
                }
            } catch (error) {
                console.log(error);
                auth.destroySession();
            } finally {
                return true;
            }
        }

        return true;
    }

    doLogOut() {
        auth.logout();
        // store.dispatch({ type: actionTypes.LOG_OUT });
    }
}

export default new AuthStrategy();
