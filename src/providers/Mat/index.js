/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Mat provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import MatContext from './Context';
import Provider from './Provider';
import withMat from './with';

/* eslint-disable padded-blocks */
function useMat() {
    return useContext(MatContext);
}
/* eslint-enable padded-blocks */

export { withMat, useMat };
export default Provider;
