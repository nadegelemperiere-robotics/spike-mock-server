/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Theme provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import ThemeContext from './Context';
import Provider from './Provider';
import withTheme from './with';

/* eslint-disable padded-blocks */
function useTheme() {
    return useContext(ThemeContext);
}
/* eslint-enable padded-blocks */

export { withTheme, useTheme };
export default Provider;
