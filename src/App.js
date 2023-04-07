/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Main component defintion
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 february 2022
# Latest revision: 01 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Website includes */
import { Layout, ErrorBoundary } from './containers';
import { Profiler } from './components';
import Config from './config';
import { ConfigProvider } from './providers';
import logMessage from './utils/logging';

/* Pages includes */
import Loading from './views/loading/Loading';

function App() {

    /* --------- Gather inputs --------- */
    const componentName = 'App';

    console.log(Config)

    /* -- Manage body settings - */
    useEffect(() => {

        logMessage(componentName, 'useEffect --- BEGIN');

        document.body.style.setProperty('background-color', 'whitesmoke');
        document.body.style.setProperty('margin', 0);
        document.body.style.setProperty('font-family',"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Open Sans', sans-serif");
        document.body.style.setProperty('-webkit-font-smoothing', 'antialiased');
        document.body.style.setProperty('-moz-osx-font-smoothing', 'grayscale');

        logMessage(componentName, 'useEffect --- END');

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    return (
        <div style={{ textAlign:'center' }}>
            <ErrorBoundary>
                <Profiler id="App">
                    <ConfigProvider appConfig={Config}>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="*"
                                    element={(
                                        <Suspense fallback={<Loading />}>
                                            <Layout />
                                        </Suspense>
                                    )}
                                />
                            </Routes>
                        </BrowserRouter>
                    </ConfigProvider>
                </Profiler>
            </ErrorBoundary>
        </div>
    );

}

export default App;
