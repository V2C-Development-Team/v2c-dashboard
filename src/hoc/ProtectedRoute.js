import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, rule, routeTo, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (rule()) return <Component {...props} {...rest} />;
                return (
                    <Redirect
                        to={{
                            pathname: routeTo,
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
