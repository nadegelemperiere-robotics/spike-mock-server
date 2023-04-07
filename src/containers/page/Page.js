/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Page generic container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
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
