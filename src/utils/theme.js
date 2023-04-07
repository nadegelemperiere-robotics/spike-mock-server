/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Theme management utils
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 february 2021
# Latest revision: 03 february 2021
# -------------------------------------------------------*/

/* Material UI includes */
import { createTheme } from '@mui/material/styles';

const getThemeSource = (id, ts, isDarkMode) => {

    if (ts) {

        for (let i = 0; i < ts.length; i += 1) {

            if (ts[i].id === id) {

                const { source } = ts[i];
                const palette = source != null ? source.palette : {};
                return createTheme({
                    ...source,
                    palette: {
                        ...palette,
                        mode: isDarkMode ? 'dark' : 'light',
                    },
                    direction: 'ltr',
                    typography: {
                        h1: {
                            fontSize: '2.5rem',
                            color: palette.primary.main,
                            textTransform: 'uppercase',
                            fontFamily: 'Roboto Condensed',
                            position: 'relative',
                            marginBottom: '15px',
                            marginTop: '10px',
                            '@media (max-width:768px)': { fontSize: '1.2rem' },
                            '@media (max-width:320px)': { fontSize: '1.2rem' },
                            '&::before': {
                                bottom: '-10px',
                                width: '100px',
                                height: '1px',
                                padding: '4px 0 5px',
                                borderStyle: 'solid',
                                borderWidth: '1px 0',
                                borderColor: palette.primary.main,
                                opacity: '0.67',
                                content: '"  "',
                                position: 'absolute',
                                left: '0px',
                                right: '0px',
                                margin: '0 auto',
                            },
                            '&::after': {
                                bottom: '-5px',
                                width: '200px',
                                height: '1px',
                                left: '0px',
                                right: '0px',
                                backgroundColor: palette.primary.main,
                                content: '"  "',
                                position: 'absolute',
                                margin: '0 auto',
                            },
                        },
                        h2: {
                            fontSize: '2rem',
                            color: 'black',
                            textTransform: 'uppercase',
                            fontFamily: 'Roboto Condensed',
                            position: 'relative',
                            marginBottom: '10px',
                            marginTop: '10px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            '&::before': {
                                top: '40px',
                                width: '100px',
                                height: '1px',
                                padding: '4px 0 5px',
                                borderStyle: 'solid',
                                borderWidth: '1px 0',
                                borderColor: 'black',
                                opacity: '0.67',
                                content: '"  "',
                                position: 'absolute',
                                left: '0px',
                                right: '0px',
                                margin: '0 0',
                            },
                            '&::after': {
                                top: '45px',
                                width: '200px',
                                height: '1px',
                                left: '0px',
                                right: '0px',
                                backgroundColor: 'black',
                                content: '"  "',
                                position: 'absolute',
                                margin: '0 0',
                            },
                            '@media (max-width:768px)': {
                                fontSize: '1rem',
                                '&::after': { top: '25px' },
                                '&::before': { top: '20px' },
                            },
                            '@media (max-width:320px)': {
                                fontSize: '1rem',
                                '&::after': { top: '25px' },
                                '&::before': { top: '20px' },
                            },
                        },
                        h3: {
                            fontSize: '14px',
                            color: 'black',
                            textTransform: 'uppercase',
                            fontFamily: 'Roboto Condensed',
                            position: 'relative',
                            marginBottom: '10px',
                            marginTop: '10px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            '&::after': {
                                top: '20px',
                                width: '20px',
                                height: '1px',
                                left: '0px',
                                right: '0px',
                                backgroundColor: 'black',
                                content: '"  "',
                                position: 'absolute',
                                margin: '0 0',
                            },
                        },
                        body1: {
                            fontSize: '14px',
                            color: 'black',
                            fontFamily: 'Roboto',
                            position: 'relative',
                            textAlign: 'justify',
                        },
                        body2: {
                            fontSize: '14px',
                            color: 'black',
                            fontFamily: 'Roboto',
                            position: 'relative',
                            textAlign: 'justify',
                        },
                    },
                });

            }

        }

    }

    return createTheme({
        palette: { mode: isDarkMode ? 'dark' : 'light' },
        direction: 'ltr',
    });

};

export { getThemeSource };

export default getThemeSource;
