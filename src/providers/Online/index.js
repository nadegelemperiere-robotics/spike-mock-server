/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Online provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import OnlineContext from './Context';
import Provider from './Provider';
import withOnline from './with';

/* eslint-disable padded-blocks */
function useOnline() {
    return useContext(OnlineContext);
}
/* eslint-enable padded-blocks */

export { withOnline, useOnline };
export default Provider;
