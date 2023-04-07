/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Page generic container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect } from 'react';

/* Website includes */
import { useConfig, useMenu } from '../../providers';
import logMessage from '../../utils/logging';

/* Local includes */
import DesktopFrame from './DesktopFrame';
import DesktopMenu from './DesktopMenu';
import DesktopContent from './DesktopContent';

function Desktop() {

    /* --------- Gather inputs --------- */
    const { toggleThis, isDesktop } = useMenu();
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { height = '115px', margin = '20px', maxWidth = '1300px' } = menu || {};
    const componentName = 'Desktop';

    /* --------- Derive sizes ---------- */
    const marginSideString = `max( ${margin}, calc((100vw - ${maxWidth} )/2))`;
    const widthString = `min(calc(100vw - 2 * ${margin} ), ${maxWidth} )`;
    const heightMenuString = `calc( ${height} - ${margin} )`;
    const heightContentString = `calc( 100vh - ${margin} )`;

    /* -- Manage switching from mobile - */
    useEffect(() => {

        logMessage(componentName, 'useEffect[isDesktop] --- BEGIN');
        if (isDesktop) { toggleThis('isMenuOpen', false); }
        logMessage(componentName, 'useEffect[isDesktop] --- END');

    }, [isDesktop]); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* ----------- Define HTML ---------
       --> DesktopFrame : level -1
       --> DesktopMenu : level 0-1100
       --> DesktopContent: level 0
       --------------------------------- */
    return (
        <div id="all" sx={{ overflowY: 'hidden' }}>
            <DesktopFrame />
            <DesktopMenu
                top={margin}
                left={marginSideString}
                width={widthString}
                height={heightMenuString}
            />
            <DesktopContent
                top={margin}
                left={marginSideString}
                width={widthString}
                height={heightContentString}
            />
        </div>
    );

}

export default Desktop;
