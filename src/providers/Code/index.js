/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Robot provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
