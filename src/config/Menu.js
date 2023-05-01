/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Menu configuration loading
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 february 2021
# Latest revision: 03 february 2021
# -------------------------------------------------------*/

/* Local includes */
import MenuConfig from './data/menu.json';

/* Material UI includes */
import { Home as HomeIcon, Settings as SettingsIcon } from '@mui/icons-material';

const Menu = MenuConfig;
const initialItemSelected = {};

/* eslint-disable brace-style, padded-blocks */
const array = Object.entries(MenuConfig.content);
for (let i = 0; i < array.length; i += 1) {
    if (array[i][1].selected) { initialItemSelected[array[i][1].id] = true; }
    else { initialItemSelected[array[i][1].id] = false; }
}
/* eslint-enable brace-style, padded-blocks */

Menu.icons = {
    home: HomeIcon,
    settings: SettingsIcon,
};
Menu.initialMenuOpen = false;
Menu.initialItemSelected = initialItemSelected;

export default Menu;
