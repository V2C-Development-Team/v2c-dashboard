import React, { useState } from 'react';
import './Start.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './utils/theme';
import Layout from './components/Layout/Layout';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeContext } from './context/themeContext';

const Start = () => {
    const [themeColor, setThemeColor] = useState('light');
    const toggleThemeColor = () => {
        setThemeColor((themeColor) =>
            themeColor === 'light' ? 'dark' : 'light'
        );
    };

    React.createContext({ themeColor, toggleThemeColor });

    return (
        <ThemeProvider theme={getTheme(themeColor)}>
            <StylesProvider injectFirst>
                <ThemeContext.Provider value={{ themeColor, toggleThemeColor }}>
                    <div className={themeColor}>
                        <Layout />
                    </div>
                </ThemeContext.Provider>
            </StylesProvider>
        </ThemeProvider>
    );
};

export default Start;
