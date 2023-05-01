/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings local storage reducer actions
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/


/* Local includes */
import * as types from './types';

/* eslint-disable padded-blocks */
export function setTime(content) {
    return { type: types.SET_TIME, payload: content };
}

export function setRobot(content) {
    return { type: types.SET_ROBOT, payload: content };
}

export function setRefresh(content) {
    return { type: types.SET_REFRESH, payload: content };
}

export function setDynamics(content) {
    return { type: types.SET_DYNAMICS, payload: content };
}

export function setMat(content) {
    return { type: types.SET_MAT, payload: content };
}

/* eslint-enable padded-blocks */
