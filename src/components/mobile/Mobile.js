/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Mobile menu structure
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Website includes */
import { useConfig, useMenu } from '../../providers';
import { HamburgerMenu } from '../../components';

/* Local includes */
import MobileFrame from './MobileFrame';
import MobileContent from './MobileContent';
import MobileMenu from './MobileMenu';

function Mobile() {

    /* --------- Gather inputs --------- */
    const { isMenuOpen } = useMenu();
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { height = '115px' } = menu || {};
    //const componentName = 'Mobile';

    /* ----------- Define HTML ---------
       --> MobileFrame : level -1
       --> MobileMenu : level 0-1100
       --> MobileContent: level 0
       --------------------------------- */
    return (
        <React.Fragment key="mobilenav">
            <MobileFrame />
            <MobileMenu top="0px" left="0px" width="100vw" height={height} />
            {(isMenuOpen) && (<HamburgerMenu />)}
            <MobileContent top="0px" left="0px" width="100vw" height="100vh" />
        </React.Fragment>
    );

}

export default Mobile;
