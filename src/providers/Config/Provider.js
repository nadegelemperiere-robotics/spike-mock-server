/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Config provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
