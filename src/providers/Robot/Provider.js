/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Robot provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useReducer, useEffect, useMemo } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';
import { useScenario } from '../../providers';

/* Local includes */
import RobotContext from './Context';
import { setHub, setComponents, setPosition } from './store/actions';
import reducer from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'robot' } = props;
    const { refresh } = useScenario();
    const componentName = 'RobotProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [robotState, dispatch] = useReducer(reducer, {
        components: [],
        hub: [],
        position: {},
        ...savedState,
    });

    /* ----- Manage robot characteristics retrieval ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[robotState, period] --- BEGIN');
        /* eslint-disable padded-blocks, brace-style */
        function getStatus() {

            fetch('v1/robot/component')
                .then((response) => response.json())
                .then((data) => dispatch(setComponents(data !== null ? data : robotState.components)))
                .catch((err) => { console.log(err.message); });

            fetch('v1/robot/hub')
                .then((response) => response.json())
                .then((data) => dispatch(setHub(data !== null ? data : robotState.hub)))
                .catch((err) => { console.log(err.message); });

            fetch('v1/robot/position')
                .then((response) => response.json())
                .then((data) => dispatch(setPosition(data !== null ? data : robotState.position)))
                .catch((err) => { console.log(err.message); });
        }
        const interval = setInterval(() => getStatus(), refresh)
        logMessage(componentName, 'useEffect[robotState, refresh] --- END');
        return () => {
            clearInterval(interval);
        }
        /* eslint-disable padded-blocks, brace-style */

    }, [robotState, refresh]);

    useEffect(() => {

        logMessage(componentName, 'useEffect[componentsState, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(robotState));
        logMessage(componentName, 'useEffect[componentsState, persistKey] --- END');

    }, [robotState, persistKey]);

    const memorizedValue = useMemo(() => ({ components:robotState.components, hub:robotState.hub, position:robotState.position }), [robotState]);

    /* ----------- Define HTML --------- */
    return (
        <RobotContext.Provider value={memorizedValue}>
            {children}
        </RobotContext.Provider>
    );

}

export default Provider;
