/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Theme provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
