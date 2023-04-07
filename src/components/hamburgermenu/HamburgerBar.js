/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
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
import { Stack, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useMenu } from '../../providers';
import logMessage from '../../utils/logging';

/* Local includes */
import HamburgerLogo from './HamburgerLogo';
import HamburgerStack from './HamburgerStack';
import HamburgerTypography from './HamburgerTypography';

function HamburgerBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '115px' } = props;
    const { isSliding } = useMenu();
    const theme = useTheme();
    const componentName = 'HamburgerBar';

    /* ------ Manage switch change ----- */

    /* -------- Defining theme --------- */
    let stackcolor = theme.palette.primary.main;
    if (isSliding) { stackcolor = theme.palette.common.white; }

    /* ----------- Define HTML --------- */
    return (
        <HamburgerStack placeholder="hamburgerbar" id="hamburgerbar" direction="row" alignItems="center" justifyContent="space-between" color={stackcolor} padding="0px" height={height}>
            <HamburgerLogo padding="20px" height={height} reference={isSliding ? 'logoWhite' : 'logo'} />
            <HamburgerTypography col={stackcolor} style={{width: '100%', textAlign: 'center'}}>SPIKE MOCK CLIENT</HamburgerTypography>
        </HamburgerStack>
    );

}

export default HamburgerBar;
