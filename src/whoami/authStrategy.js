import api from '../services/api';
import auth from './auth';
/* import store from '../store/store';
import * as actionTypes from '../store/actions'; */

class AuthStrategy {
    async doAuth() {
        if (auth.isSessionHydrated()) {
            try {
                let id = auth.getUserID();
                if(!id || id === undefined) return
                let response = await api.get('/users/' + id);
                let user = response.data.users[0];
                
              //  store.dispatch({ type: actionTypes.LOG_IN, value: userData });
                auth.login(user);

                return;
            } catch (error) {
                auth.destroySession();
                return;
            }
        }
    }

    doLogOut() {
        auth.logout();
       // store.dispatch({ type: actionTypes.LOG_OUT });
    }
}

export default new AuthStrategy();
