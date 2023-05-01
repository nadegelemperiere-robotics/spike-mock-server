/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Online provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useState } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import OnlineContext from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children } = props;
    const [isOnline, setOnline] = useState(navigator.onLine);
    const componentName = 'OnlineProvider';

    /* --------- Initialization -------- */
    logMessage(componentName, 'setOnline --- BEGIN');
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
    logMessage(componentName, 'setOnline --- END');

    /* ----------- Define HTML --------- */
    return (
        <OnlineContext.Provider value={isOnline}>
            {children}
        </OnlineContext.Provider>
    );

}

export default Provider;
