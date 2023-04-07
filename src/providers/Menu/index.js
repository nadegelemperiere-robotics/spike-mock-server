/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Menu provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import MenuContext from './Context';
import Provider from './Provider';
import withMenu from './with';

/* eslint-disable padded-blocks */
function useMenu() {
    return useContext(MenuContext);
}
/* eslint-enable padded-blocks */

export { withMenu, useMenu };
export default Provider;
