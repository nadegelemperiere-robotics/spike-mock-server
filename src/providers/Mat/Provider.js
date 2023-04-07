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
    const { children, persistKey = 'mat' } = props;
    const componentName = 'MatProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [matState, dispatch] = useState({
        mat: null,
        ...savedState,
    });

    /* ----- Manage mat change ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[] --- BEGIN');
        function getStatus() {

            console.log('getting mat')
            fetch('v1/mat')
            .then((response) => response.blob())
            .then((data) => {
                URL.revokeObjectURL(matState.mat);
                const img = URL.createObjectURL(data)
                dispatch({...matState, mat:img});
                console.log(matState)
            })
            .catch((err) => {
                console.log(err.message);
            });

        }
        const interval = setInterval(() => getStatus(), 10000)
        return () => {
          clearInterval(interval);
        }

    }, []);

    useEffect(() => {

        logMessage(componentName, 'useEffect[mat, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(matState));
        logMessage(componentName, 'useEffect[mat, persistKey] --- END');

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
