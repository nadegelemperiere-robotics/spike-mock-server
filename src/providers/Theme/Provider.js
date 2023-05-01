/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Theme provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useState, useEffect, useMemo } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import ThemeContext from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'theme', appConfig } = props;
    const { theme: themeConfig } = appConfig || {};
    const { defaultThemeID, defaultIsDarkMode } = themeConfig || {};
    const [themeID, setThemeID] = useState(defaultThemeID);
    const [isDarkMode, setIsDarkMode] = useState(defaultIsDarkMode);
    const themeIDKey = `${persistKey}:themeID`;
    const isDarkModeKey = `${persistKey}:isDarkMode`;
    const componentName = 'ThemeProvider';

    /* ------- Handle theme change ----- */

    useEffect(() => {

        logMessage(componentName, 'useEffect[themeIDKey, isDarkModeKey] --- BEGIN');

        const persistThemeID = localStorage.getItem(themeIDKey);
        const persistIsDarkMode = localStorage.getItem(isDarkModeKey);
        if (persistThemeID) { setThemeID(persistThemeID); }
        if (persistIsDarkMode) { setIsDarkMode(persistIsDarkMode === 'true'); }

        logMessage(componentName, 'useEffect[themeIDKey, isDarkModeKey] --- END');

    }, [themeIDKey, isDarkModeKey]);

    useEffect(() => {

        /* eslint-disable brace-style */
        logMessage(componentName, 'useEffect[themeID, themeIDKey] --- BEGIN');
        localStorage.setItem(themeIDKey, themeID);
        logMessage(componentName, 'useEffect[themeID, themeIDKey] --- END');
        /* eslint-enable brace-style */

    }, [themeID, themeIDKey]);

    useEffect(() => {

        /* eslint-disable brace-style */
        logMessage(componentName, 'useEffect[isDarkMode, isDarkModeKey] --- BEGIN');
        localStorage.setItem(isDarkModeKey, isDarkMode);
        logMessage(componentName, 'useEffect[isDarkMode, isDarkModeKey] --- END');
        /* eslint-enable brace-style */

    }, [isDarkMode, isDarkModeKey]);

    /* ----------- Define HTML --------- */
    const memorizedValue = useMemo(() => ({
        toggleThisTheme(mode) {

            logMessage(componentName, 'toggleThisTheme --- BEGIN');
            if (mode === 'isDarkMode') { setIsDarkMode(!isDarkMode); }
            logMessage(componentName, 'toggleThisTheme --- END');

        },
        themeID,
        setThemeID,
        isDarkMode,
    }), [themeID, isDarkMode, setThemeID]);

    return (
        <ThemeContext.Provider value={memorizedValue}>
            {children}
        </ThemeContext.Provider>
    );

}

export default Provider;
