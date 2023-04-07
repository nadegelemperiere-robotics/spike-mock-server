/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Config provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import ConfigContext from './Context';
import Provider from './Provider';
import withConfig from './with';

/* eslint-disable padded-blocks */
function useConfig() {
    return useContext(ConfigContext);
}
/* eslint-enable padded-blocks */

export { withConfig, useConfig };
export default Provider;
