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
