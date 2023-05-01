/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Menu provider reducer
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Local includes */
import * as types from './types';

/* eslint-disable default-param-last */
export default function reducer(state = {}, action) {

    /* eslint-enable default-param-last */
    const { type, payload } = action;
    switch (type) {

    case types.SET_IS_ITEM_SELECTED:
        return { ...state, isItemSelected: payload };
    case types.SET_IS_MENU_OPEN:
        return { ...state, isMenuOpen: payload };
    case types.SET_IS_SLIDING:
        return { ...state, isSliding: payload };
    default:
        return state;

    }

}
