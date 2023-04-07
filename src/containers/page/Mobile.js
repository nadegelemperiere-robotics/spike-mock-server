/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Page generic container for mobile
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect, useRef } from 'react';

/* Material UI includes */
import { useScrollTrigger } from '@mui/material';

/* Website includes */
import { useMenu } from '../../providers';
import { Footer } from '../../components';
import logMessage from '../../utils/logging';

function Mobile(props) {

    /* --------- Gather inputs --------- */
    const { children } = props;
    const { toggleThis } = useMenu();
    const componentName = 'MobilePage';

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
            id="mobile"
            style={{
                width: '100vw',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: '#ffffff',
                top: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                marginTop: '0px',
            }}
        >
            <div ref={ref} style={{ backgroundColor: '#ffffff', position: 'absolute', overflowX: 'hidden', overflowY: 'scroll', width: '100vw', height: '100vh', top: 0, paddingLeft: 0, paddingRight: 0, zIndex: '1' }}>
                {children}
                <Footer/>
            </div>
        </div>
    );

}

export default Mobile;
