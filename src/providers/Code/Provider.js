/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Code provider
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
import CodeContext from './Context';
import { setCode, setError } from './store/actions';
import reducer from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'code' } = props;
    const { refresh } = useScenario();
    const componentName = 'CodeProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [codeState, dispatch] = useReducer(reducer, {
        code: "",
        error: "",
        ...savedState,
    });

    /* ----- Manage console retrieval ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[codeState, refresh] --- BEGIN');
        /* eslint-disable padded-blocks, brace-style */
        function getStatus() {

            fetch('v1/command/console')
                .then((response) => response.json())
                .then((data) => dispatch(setError(data.console !== null ? data.console : codeState.error)))
                .catch((err) => { console.log(err.message); });
        }
        const interval = setInterval(() => getStatus(), refresh)
        logMessage(componentName, 'useEffect[codeState, refresh] --- END');
        return () => {
            clearInterval(interval);
        }
        /* eslint-disable padded-blocks, brace-style */

    }, [codeState, refresh]);

    useEffect(() => {

        logMessage(componentName, 'useEffect[codeState, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(codeState));
        logMessage(componentName, 'useEffect[codeState, persistKey] --- END');

    }, [codeState, persistKey]);

    const memorizedValue = useMemo(() => ({
        changeCode(code)
        {
            logMessage(componentName, 'changeCode --- BEGIN');
            dispatch(setCode(code !== null ? code : codeState.code))
            logMessage(componentName, 'changeCode --- END');
        },
        code: codeState.code,
        error: codeState.error,
    }), [codeState]);

    /* ----------- Define HTML --------- */
    return (
        <CodeContext.Provider value={memorizedValue}>
            {children}
        </CodeContext.Provider>
    );

}

export default Provider;
