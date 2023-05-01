/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Code provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */
export function setCode(content) {
    return { type: types.SET_CODE, payload: content };
}

export function setError(content) {
    return { type: types.SET_ERROR, payload: content };
}

/* eslint-enable padded-blocks */
