import React, { useState, useEffect } from 'react';
import './Start.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './utils/theme';
import Layout from './components/Layout/Layout';
import { StylesProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeContext } from './context/themeContext';

const Start = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themePref = localStorage.getItem('theme');
    const [themeColor, setThemeColor] = useState(
        themePref || (prefersDarkMode ? 'dark' : 'light')
    );

    const toggleThemeColor = () => {
        setThemeColor((themeColor) =>
            themeColor === 'light' ? 'dark' : 'light'
        );
        localStorage.setItem(
            'theme',
            themeColor === 'light' ? 'dark' : 'light'
        );
    };

    useEffect(() => {
        let tempThemeColor = prefersDarkMode ? 'dark' : 'light';
        const themePref = localStorage.getItem('theme');
        if (themePref && (themePref === 'dark' || themePref === 'light')) {
            tempThemeColor = themePref;
        }
        setThemeColor(tempThemeColor);
    }, [prefersDarkMode]);

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
