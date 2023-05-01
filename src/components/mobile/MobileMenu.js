/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Mobile menu definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import HamburgerBar from '../hamburgermenu/HamburgerBar';

/* Local includes */
import MobileBar from './MobileBar';

function MobileMenu(props) {

    /* --------- Gather inputs --------- */
    const {
        top = '95px',
        left = '20px',
        height = '20px',
        width = '100%',
    } = props || {};
    const theme = useTheme();
    //const componentName = 'MobileMenu';

    /* ----------- Define HTML --------- */
    return (
        <MobileBar
            width={width}
            height={height}
            top={top}
            left={left}
            col={theme.palette.primary.main}
        >
            <Toolbar variant="dense" style={{ height: '100%', width: '100%' }}>
                <HamburgerBar height={height} />
            </Toolbar>
        </MobileBar>
    );

}

export default MobileMenu;
