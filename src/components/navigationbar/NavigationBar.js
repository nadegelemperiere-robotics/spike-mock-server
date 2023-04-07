/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Navigation bar for desktop appliances
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useMenu } from '../../providers';

/* Local includes */
import NavigationLogo from './NavigationLogo';
import NavigationStack from './NavigationStack';
import NavigationTypography from './NavigationTypography';

function NavigationBar(props) {

    /* --------- Gather inputs --------- */
    const { height = '115px', width = '100%' } = props || {};
    const { isSliding } = useMenu();
    const theme = useTheme();
    //const componentName = 'NavigationBar';

    /* -------- Defining theme --------- */
    let stackcolor = theme.palette.primary.main;
    if (isSliding) { stackcolor = theme.palette.common.white; }

    /* ----------- Define HTML --------- */
    return (
        <NavigationStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            color={stackcolor}
            padding="0px"
            height={height}
            width={width}
        >
            <NavigationLogo
                padding="5px"
                reference={isSliding ? 'logoWhite' : 'logo'}
            />
            <NavigationTypography col={stackcolor} style={{width: '100%', textAlign: 'center'}}>SPIKE MOCK CLIENT</NavigationTypography>
        </NavigationStack>
    );

}

export default NavigationBar;
