/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Menu provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
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
