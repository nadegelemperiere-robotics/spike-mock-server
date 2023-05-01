/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Hamburger bar for mobile navigation
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

/* Website includes */
import { useMenu } from '../../providers';

/* Local includes */
import HamburgerLogo from './HamburgerLogo';
import HamburgerStack from './HamburgerStack';
import HamburgerIcon from './HamburgerIcon';

function HamburgerBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '115px' } = props;
    const { isSliding } = useMenu();
    const theme = useTheme();
    /* const componentName = 'HamburgerBar'; */

    /* -------- Defining theme --------- */
    let stackcolor = theme.palette.primary.main;
    if (isSliding) { stackcolor = theme.palette.common.white; }

    /* ----------- Define HTML --------- */
    return (
        <HamburgerStack placeholder="hamburgerbar" id="hamburgerbar" direction="row" alignItems="center" justifyContent="space-between" color={stackcolor} padding="0px" height={height}>
            <HamburgerLogo padding="20px" height={height} reference={isSliding ? 'logoWhite' : 'logo'} />
            <Box style={{ width: '100%', align: 'center'}}>
                <HamburgerIcon width="30px" height="30px" color={stackcolor} />
            </Box>

        </HamburgerStack>
    );

}

export default HamburgerBar;
