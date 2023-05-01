/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Config provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
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
