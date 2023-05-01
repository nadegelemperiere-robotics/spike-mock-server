/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Code provider export
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import CodeContext from './Context';
import Provider from './Provider';
import withCode from './with';

/* eslint-disable padded-blocks */
function useCode() {
    return useContext(CodeContext);
}
/* eslint-enable padded-blocks */

export { withCode, useCode};
export default Provider;
