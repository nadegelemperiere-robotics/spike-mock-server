/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Generic page container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useEffect } from 'react';

/* Website includes */
import { useMenu } from '../../providers';

/* Local includes */
import Desktop from './Desktop';
import Mobile from './Mobile';

function Page(props) {

    /* --------- Gather inputs --------- */
    const { children, isLoading, pageTitle } = props;
    const { isDesktop } = useMenu();

    /* -- Choosing layout from device -- */
    let LocalLayout;
    /* eslint-disable brace-style */
    if (isDesktop) { LocalLayout = Desktop; }
    else { LocalLayout = Mobile; }
    /* eslint-enable brace-style */

    /* ------- Setting page name ------- */
    useEffect(() => {

        document.title = pageTitle;

    }, [ pageTitle ]);

    return (
        <LocalLayout isLoading={isLoading}>
            {children}
        </LocalLayout>
    );

}

export default Page;
