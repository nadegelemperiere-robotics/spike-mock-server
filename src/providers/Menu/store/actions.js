/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Menu provider reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/


/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */
export function setIsMenuOpen(content) {
    return { type: types.SET_IS_MENU_OPEN, payload: content };
}

export function setIsSliding(content) {
    return { type: types.SET_IS_SLIDING, payload: content };
}

export function setIsItemSelected(content) {
    return { type: types.SET_IS_ITEM_SELECTED, payload: content };
}
/* eslint-enable padded-blocks */
