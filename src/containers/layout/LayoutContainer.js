/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Layout for the global portal
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

/* Other external includes */
import { SnackbarProvider } from 'notistack';

/* Website includes */
import { getThemeSource } from '../../utils/theme';
import { AppThemeProvider, MenuProvider, useConfig, useAppTheme } from '../../providers';

/* Font includes */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/700.css';

function LayoutContent(props) {

    /* --------- Gather inputs --------- */
    const { children } = props;
    const { appConfig } = useConfig();
    const { themeID, isDarkMode } = useAppTheme();
    const { theme: themeConfig } = appConfig || {};
    const { themes = [] } = themeConfig || {};
    const theme = getThemeSource(themeID, themes, isDarkMode);


    /* ----------- Define HTML --------- */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    );

}

function LayoutContainer(props) {

    /* --------- Gather inputs --------- */
    const { children } = props;
    const { appConfig } = useConfig();

    /* ----------- Define HTML --------- */
    return (
        <MenuProvider appConfig={appConfig}>
            <AppThemeProvider appConfig={appConfig}>
                <div style={{ display: 'flex' }}>
                    <LayoutContent>
                        {children}
                    </LayoutContent>
                </div>
            </AppThemeProvider>
        </MenuProvider>
    );

}

export default LayoutContainer;
