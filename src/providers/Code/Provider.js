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
import React, { useReducer, useEffect, useMemo } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import CodeContext from './Context';
import { setCode, setError } from './store/actions';
import reducer from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { period, children, persistKey = 'code' } = props;
    const componentName = 'CodeProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [codeState, dispatch] = useReducer(reducer, {
        code: "",
        error: "",
        ...savedState,
    });

    /* ----- Manage console retrieval ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[codeState, period] --- BEGIN');
        /* eslint-disable padded-blocks, brace-style */
        function getStatus() {

            fetch('v1/command/console')
                .then((response) => response.json())
                .then((data) => dispatch(setError(data.console !== null ? data.console : codeState.error)))
                .catch((err) => {
                    logMessage(componentName, err.message);
                });
        }
        const interval = setInterval(() => getStatus(), period)
        logMessage(componentName, 'useEffect[codeState, period] --- END');
        return () => {
            clearInterval(interval);
        }
        /* eslint-disable padded-blocks, brace-style */

    }, [codeState, period]);

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
