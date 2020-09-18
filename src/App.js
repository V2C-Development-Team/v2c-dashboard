import React, { useState } from 'react';
import './App.scss';
import { ThemeProvider } from '@material-ui/core/styles';

import getTheme from './utils/theme';
import Landing from './pages/Landing/Landing';
import Layout from './components/Layout/Layout';

const App = () => {
    const [themeColor, setThemeColor] = useState('light');
    const handleThemeColor = () => {
        setThemeColor((themeColor) =>
            themeColor === 'light' ? 'dark' : 'light'
        );
    };
    return (
        <ThemeProvider theme={getTheme(themeColor)}>
            {/* <Landing /> */}
            <div className={themeColor}>
                <Layout
                    themeColor={themeColor}
                    setThemeColor={handleThemeColor}
                />
            </div>
        </ThemeProvider>
    );
};

export default App;
