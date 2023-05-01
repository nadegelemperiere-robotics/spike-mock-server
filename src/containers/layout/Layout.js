/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Layout for the global application
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

/* Website includes */
import { OnlineProvider, RobotProvider, ScenarioProvider, CodeProvider, useConfig, useMenu } from '../../providers';
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
            <ScenarioProvider appConfig={appConfig}>
                <RobotProvider appConfig={appConfig}>
                    <CodeProvider appConfig={appConfig}>
                        <LayoutContent appConfig={appConfig} />
                    </CodeProvider>
                </RobotProvider>
            </ScenarioProvider>
        </OnlineProvider>
    );

}

export default Layout;
