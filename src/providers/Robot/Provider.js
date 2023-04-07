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
import RobotContext from './Context';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'robot' } = props;
    const componentName = 'RobotProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [componentsState, dispatch] = useState({
        components: [],
        hub: [],
        ...savedState,
    });

    /* ----- Manage robot characteristics retrieval ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[] --- BEGIN');
        function getStatus() {

            console.log('getting status')
            fetch('v1/robot/component')
            .then((response) => response.json())
            .then((data) => dispatch({...componentsState, components:data}))
            .catch((err) => {
                console.log(err.message);
            });

            fetch('v1/robot/hub')
            .then((response) => response.json())
            .then((data) => dispatch({...componentsState, hub:data}))
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
        localStorage.setItem(persistKey, JSON.stringify(componentsState));
        logMessage(componentName, 'useEffect[mat, persistKey] --- END');

    }, [componentsState, persistKey]);

    const memorizedValue = useMemo(() => ({ components:componentsState.components, hub:componentsState.hub }), [componentsState]);

    /* ----------- Define HTML --------- */
    return (
        <RobotContext.Provider value={memorizedValue}>
            {children}
        </RobotContext.Provider>
    );

}

export default Provider;
