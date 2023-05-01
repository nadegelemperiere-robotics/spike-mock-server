/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Generic page for desktop clients
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect, useRef } from 'react';

/* Material UI includes */
import { useScrollTrigger } from '@mui/material';

/* Website includes */
import { useConfig, useMenu } from '../../providers';
import { Footer } from '../../components';
import logMessage from '../../utils/logging';

function Desktop(props) {

    /* --------- Gather inputs --------- */
    const { children } = props;
    const { toggleThis } = useMenu();
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { margin = '20px', maxWidth = '1100px' } = menu || {};
    const componentName = 'DesktopPage';

    /* --------- Compute sizes --------- */
    const menuHeightString = '0px';
    const marginString = `max( ${margin} ,calc((100vw - ${maxWidth} )/2)`;
    const widthString = `min(calc(100vw - 2 * ${margin} ), ${maxWidth} )`;
    const heightString = `calc( 100vh - ${margin} )`;
    const heightTextString = `calc( 100vh - ${margin} - ${menuHeightString} )`;
    const topString = '0px';

    /* ----- Manage sliding event  ---- */
    const ref = useRef();
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: ref.current ? ref.current : window,
    });

    useEffect(() => {

        /* eslint-disable brace-style */
        logMessage(componentName, 'useEffect[scrollTrigger] --- BEGIN');
        toggleThis('isSliding', scrollTrigger);
        logMessage(componentName, 'useEffect[scrollTrigger] --- END');
        /* eslint-enable brace-style */

    }, [scrollTrigger]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML --------- */
    return (
        <div
            id="page"
            style={{
                width: widthString,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                height: heightString,
                backgroundColor: '#ffffff',
                top: margin,
                marginLeft: marginString,
                marginRight: marginString,
                marginBottom: 0,
                marginTop: '0px',
            }}
        >
            <div ref={ref} style={{ backgroundColor: '#ffffff', position: 'absolute', overflowY: 'scroll', width: widthString, height: heightTextString, top: topString, paddingLeft: 0, paddingRight: 0, zIndex: '1' }}>
                {children}
                <Footer/>
            </div>
        </div>
    );

}

export default Desktop;
