import React, { useState } from 'react';
import './App.scss';
import { ThemeProvider } from '@material-ui/core/styles';

import getTheme from './utils/theme';
import Landing from './pages/Landing/Landing';

const App = () => {
    const [themeColor, setThemeColor] = useState('light');
    const handleThemeColor = () => {
        setThemeColor((themeColor) =>
            themeColor === 'light' ? 'dark' : 'light'
        );
    };
    return (
        <ThemeProvider theme={getTheme(themeColor)}>
            <Landing themeColor={themeColor} setThemeColor={handleThemeColor} />
        </ThemeProvider>
    );
};

export default App;
