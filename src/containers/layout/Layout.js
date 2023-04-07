/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Layout container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

/* Website includes */
import { OnlineProvider, MatProvider, RobotProvider, useConfig, useMenu } from '../../providers';
import { Mobile, Desktop } from '../../components';
import logMessage from '../../utils/logging';
import Loading from '../../views/loading/Loading';

/* Local includes */
import LayoutContainer from './LayoutContainer';

function LayoutMode() {

    /* --------- Gather inputs --------- */
    const { toggleThis, isDesktop } = useMenu();
    const componentName = 'LayoutMode';

    /* -- Manage switching from mobile - */
    useEffect(() => {

        logMessage(componentName, 'useEffect[isDesktop] --- BEGIN');
        if (isDesktop) { toggleThis('isMenuOpen', false); }
        logMessage(componentName, 'useEffect[isDesktop] --- END');

    }, [isDesktop]); /* eslint-disable-line react-hooks/exhaustive-deps */


    /* ----------- Define HTML --------- */
    return (
        <Suspense fallback={<Loading />}>
            {(isDesktop) && (<Desktop />)}
            {(!isDesktop) && (<Mobile />)}
        </Suspense>
    );

}

function LayoutContent(props) {

    /* --------- Gather inputs --------- */
    const { appConfig = {} } = props;
    const { routes = [] } = appConfig || {};
    //const componentName = 'LayoutContent';


    /* ----------- Define HTML --------- */
    return (
        <LayoutContainer>
            <LayoutMode fallback={<Loading />} />
            <Suspense fallback={<Loading />}>
                {useRoutes([...routes])}
            </Suspense>
        </LayoutContainer>
    );

}

function Layout() {

    /* --------- Gather inputs --------- */
    const { appConfig } = useConfig();
    //const componentName = 'Layout';

    /* ----------- Define HTML --------- */
    return (
        <OnlineProvider>
            <RobotProvider>
                <MatProvider>
                    <LayoutContent appConfig={appConfig} />
                </MatProvider>
            </RobotProvider>
        </OnlineProvider>
    );

}

export default Layout;
