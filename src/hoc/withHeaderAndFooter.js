import React, { Fragment } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const withHeaderAndFooter = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <Fragment>
                    <Header />
                    <Component {...this.props} />
                    <Footer />
                </Fragment>
            );
        }
    };
};

export default withHeaderAndFooter;
