/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Online provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
