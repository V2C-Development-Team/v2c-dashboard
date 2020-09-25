import React, { useState, useEffect } from 'react';
import './Start.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './utils/theme';
import Layout from './components/Layout/Layout';
import { StylesProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeContext } from './context/themeContext';

const Start = () => {
    const [themeColor, setThemeColor] = useState('light');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const toggleThemeColor = () => {
        setThemeColor((themeColor) =>
            themeColor === 'light' ? 'dark' : 'light'
        );
        localStorage.setItem(
            'theme',
            themeColor === 'light' ? 'dark' : 'light'
        );
    };

    React.createContext({ themeColor, toggleThemeColor });

    useEffect(() => {
        let tempThemeColor = prefersDarkMode ? 'dark' : 'light';
        const themePref = localStorage.getItem('theme');
        if (themePref && themePref === ('dark' || 'light')) {
            tempThemeColor = themePref;
        }
        setThemeColor(tempThemeColor);
    }, [prefersDarkMode]);

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
