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
