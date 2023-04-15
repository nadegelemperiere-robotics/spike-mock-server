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

/* eslint-disable padded-blocks */
export function setCode(content) {
    return { type: types.SET_CODE, payload: content };
}

export function setError(content) {
    return { type: types.SET_ERROR, payload: content };
}

/* eslint-enable padded-blocks */
