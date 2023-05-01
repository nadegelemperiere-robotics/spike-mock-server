/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Robot provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */
export function setHub(content) {
    return { type: types.SET_HUB, payload: content };
}

export function setComponents(content) {
    return { type: types.SET_COMPONENTS, payload: content };
}

export function setPosition(content) {
    return { type: types.SET_POSITION, payload: content };
}

/* eslint-enable padded-blocks */
