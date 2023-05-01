/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Robot provider reducer
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

    case types.SET_HUB:
        return { ...state, hub: payload };
    case types.SET_COMPONENTS:
        return { ...state, components: payload };
    case types.SET_POSITION:
        return { ...state, position: payload };
    default:
        return state;

    }

}
