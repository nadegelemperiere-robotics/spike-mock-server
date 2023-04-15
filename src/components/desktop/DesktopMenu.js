/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Desktop menu definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Toolbar } from '@mui/material';

/* Website includes */
import NavigationBar from '../navigationbar/NavigationBar';

/* Local includes */
import DesktopBar from './DesktopBar';

function DesktopMenu(props) {

    /* --------- Gather inputs --------- */
    const { top = '95px', left = '20px', height = '20px', width = '100%' } = props || {};

    /* ----------- Define HTML --------- */
    return (
        <DesktopBar width={width} height={height} top={top} left={left}>
            <Toolbar variant="dense" style={{ height: '100%', width: width }}>
                <NavigationBar height={height} width={width}/>
            </Toolbar>
        </DesktopBar>
    );

}

export default DesktopMenu;
