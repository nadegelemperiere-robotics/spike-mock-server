/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Menu provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect, useReducer } from 'react';

/* Material UI includes */
import { useMediaQuery } from '@mui/material';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import MenuContext from './Context';
import { setIsSliding, setIsItemSelected, setIsMenuOpen } from './store/actions';
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
    const { appConfig, children, persistKey = 'menu' } = props;
    const { menu } = appConfig || {};
    const { initialMenuOpen, initialItemSelected, content, icons } = menu;
    const componentName = 'MenuProvider';

    /* ----- Create provider state ----- */
    const isDesktop = useMediaQuery('(min-width:650px)');
    const supportsWebp = isWebpSupported();
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [menuStore, dispatch] = useReducer(reducer, {
        isMenuOpen: initialMenuOpen,
        isItemSelected: initialItemSelected,
        isSliding: false,
        ...savedState,
    });

    /* ----- Define provider values ---- */
    const memorizedValue = {
        toggleItem(value, newValue = true) {

            logMessage(componentName, `toggleItem( ${value} ) --- BEGIN`);
            const items = {};
            const array = Object.entries(menuStore.isItemSelected);
            for (let i = 0; i < array.length; i += 1) { items[array[i][0]] = false; }
            items[value] = newValue;
            dispatch(setIsItemSelected(items));
            logMessage(componentName, `toggleItem( ${value} ) --- END`);

        },
        toggleThis(value, newValue = null) {

            logMessage(componentName, `toggleThis( ${value} ) --- BEGIN`);
            /* eslint-disable padded-blocks, brace-style */
            if (value === 'isMenuOpen') {
                dispatch(
                    setIsMenuOpen(newValue !== null ? newValue : !menuStore.isMenuOpen)
                );
            }
            else if (value === 'isSliding') {
                dispatch(setIsSliding(newValue !== null ? newValue : !menuStore.isSliding));
            }
            /* eslint-enable padded-blocks, brace-style */
            logMessage(componentName, `toggleThis( ${value} ) --- END`);

        },
        isMenuOpen: menuStore.isMenuOpen,
        isItemSelected: menuStore.isItemSelected,
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
            content,
            icons,
            isDesktop,
            supportsWebp,
            ...memorizedValue,
        }}>
            {children}
        </MenuContext.Provider>
    );

}

export default Provider;
