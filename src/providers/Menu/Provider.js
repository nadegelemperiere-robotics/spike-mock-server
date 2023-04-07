/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Menu provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect, useReducer } from 'react';

/* Material UI includes */
import { useMediaQuery } from '@mui/material';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import MenuContext from './Context';
import { setIsSliding } from './store/actions';
import reducer from './store/reducer';

function isWebpSupported() {

    let result = false;
    const elem = document.createElement('canvas');
    /* eslint-disable padded-blocks, brace-style */
    if (!(elem.getContext && elem.getContext('2d'))) {
        result = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    /* eslint-enable padded-blocks, brace-style */
    return result;

}

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'menu' } = props;
    const componentName = 'MenuProvider';

    /* ----- Create provider state ----- */
    const isDesktop = useMediaQuery('(min-width:650px)');
    const supportsWebp = isWebpSupported();
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [menuStore, dispatch] = useReducer(reducer, {
        isSliding: false,
        ...savedState,
    });

    /* ----- Define provider values ---- */
    const memorizedValue = {
        toggleThis(value, newValue = null) {

            logMessage(componentName, `toggleThis( ${value} ) --- BEGIN`);
            /* eslint-disable padded-blocks, brace-style */
            if (value === 'isSliding') {
                dispatch(setIsSliding(newValue !== null ? newValue : !menuStore.isSliding));
            }
            /* eslint-enable padded-blocks, brace-style */
            logMessage(componentName, `toggleThis( ${value} ) --- END`);

        },
        isSliding: menuStore.isSliding,

    }

    useEffect(() => {

        logMessage(componentName, 'useEffect[menuStore, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(menuStore));
        logMessage(componentName, 'useEffect[menuStore, persistKey] --- END');

    }, [menuStore, persistKey]);

    /* ----------- Define HTML --------- */
    return (
        <MenuContext.Provider value={{
            isDesktop,
            supportsWebp,
            ...memorizedValue,
        }}>
            {children}
        </MenuContext.Provider>
    );

}

export default Provider;
