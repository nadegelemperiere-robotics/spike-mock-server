/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Loading page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect } from 'react';

/* Material ui includes */
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useConfig } from '../../providers';

function Loading() {

    /* --------- Gather inputs --------- */
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { margin = '20px', maxWidth = '1300px' } = menu || {};
    const theme = useTheme();

    /* -------- Defining sizes --------- */
    const marginString = `max( ${margin}, calc((100vw - ${maxWidth} )/2))`;
    const widthString = `min(calc(100vw - 2*${margin} ), ${maxWidth} )`;
    const heightString = `calc( 100vh - 2 * ${margin} )`;

    /* ------- Setting page name ------- */
    useEffect(() => {

        document.title = 'Loading';

    }, []);

    /* ----------- Define HTML --------- */
    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
            <div
                style={{
                    width: widthString,
                    height: heightString,
                    backgroundColor: theme.palette.primary.main,
                    marginTop: margin,
                    marginLeft: marginString,
                    marginRight: marginString,
                    marginBottom: margin,
                    flexDirection: 'row',
                    position: 'fixed',
                    top: '0px',
                    zIndex: '1',
                }}
            >
                <div style={{ width:'100%', height:'50vh', backgroundColor:'rgba(255,255,255,0)' }}>
                </div>
                <div style={{ width:'100%', height:'50vh', backgroundColor:'rgba(255,255,255,0)' }}>
                    <CircularProgress style={{ top:'50%', left:'50%' }} />
                </div>
            </div>
        </div>
    );

}

export default Loading;
