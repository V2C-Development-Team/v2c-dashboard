import auth from './auth';

class businessRules {
    constructor() {
        this.regitrationFlag = true;
    }

    // navbuttons only accessible for logged-out users
    nav = () => {
        return !auth.isAuthenticated();
    };
    // login only accessible for logged-out users
    login = () => {
        return !auth.isAuthenticated();
    };

    // registration only accessible for logged-out users
    register = () => {
        return !auth.isAuthenticated();
    };

    // dashboard only accessible for logged-in users
    dashboard = () => {
        return auth.isAuthenticated();
    };

    // confirmation page only available after registration
    confirmation = () => {
        return this.regitrationFlag;
    };

    // flagged after successful registration to enable confirmation page
    setRegistrationFlag = () => {
        this.regitrationFlag = true;
    };
}

export default new businessRules();
