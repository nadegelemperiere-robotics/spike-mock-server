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
export function setHub(content) {
    return { type: types.SET_HUB, payload: content };
}

export function setComponents(content) {
    return { type: types.SET_COMPONENTS, payload: content };
}

/* eslint-enable padded-blocks */
