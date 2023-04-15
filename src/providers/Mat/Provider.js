/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Theme provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { useState, useEffect, useMemo } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';


/* Local includes */
import MatContext from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { period, children, persistKey = 'mat' } = props;
    const componentName = 'MatProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [matState, dispatch] = useState({
        mat: null,
        ...savedState,
    });

    /* ----- Manage mat change ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[matState, period] --- BEGIN');
        /* eslint-disable padded-blocks, brace-style */
        function getStatus() {

            fetch('v1/mat')
                .then((response) => response.blob())
                .then((data) => {
                    URL.revokeObjectURL(matState.mat);
                    const img = URL.createObjectURL(data)
                    dispatch({...matState, mat:img});
                    logMessage(componentName, matState);
                })
                .catch((err) => {
                    logMessage(componentName, err.message);
                });

        }
        const interval = setInterval(() => getStatus(), period)
        logMessage(componentName, 'useEffect[matState, period] --- END');
        return () => {
            clearInterval(interval);
        }
        /* eslint-disable padded-blocks, brace-style */

    }, [matState, period]);

    useEffect(() => {

        logMessage(componentName, 'useEffect[matState, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(matState));
        logMessage(componentName, 'useEffect[matState, persistKey] --- END');

    }, [matState, persistKey]);


    const memorizedValue = useMemo(() => ({ mat:matState.mat }), [matState]);

    /* ----------- Define HTML --------- */
    return (
        <MatContext.Provider value={memorizedValue}>
            {children}
        </MatContext.Provider>
    );

}

export default Provider;
