/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Config provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useMemo } from 'react';

/* Local includes */
import ConfigContext from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { appConfig, children } = props;

    const memorizedValue = useMemo(() => ({ appConfig }), [appConfig]);

    /* ----------- Define HTML --------- */
    return (
        <ConfigContext.Provider value={memorizedValue}>
            {children}
        </ConfigContext.Provider>
    );

}

export default Provider;
