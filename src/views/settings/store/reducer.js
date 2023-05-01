/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings local storage reducer
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

    case types.SET_TIME:
        return { ...state, time: payload };
    case types.SET_DYNAMICS:
        return { ...state, dynamics: payload };
    case types.SET_REFRESH:
        return { ...state, refresh: payload };
    case types.SET_ROBOT:
        return { ...state, robot: payload };
    case types.SET_MAT:
        return { ...state, mat: payload };
    default:
        return state;

    }

}
