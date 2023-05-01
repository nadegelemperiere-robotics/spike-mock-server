/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Config provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/


/* React includes */
import React from 'react';

const mockContextConfig = React.createContext(null);

let mockedValues = {}

function mockWithConfig(Component) {

    function ChildComponent(props) {

        /* eslint-disable react/jsx-props-no-spreading */
        return (
            <mockContextConfig.Consumer> {(contextProps) => <Component {...contextProps} {...props} /> }</mockContextConfig.Consumer>
        );
        /* eslint-enable react/jsx-props-no-spreading */

    }
    return ChildComponent;

}

function MockProvider(props) {

    const { children } = props;

    /* ----- Define provider values ---- */
    mockedValues = {
        appConfig: {},
        ...props,
    };

    /* ----------- Define HTML --------- */
    return (
        <mockContextConfig.Provider value={mockedValues}>
            {children}
        </mockContextConfig.Provider>
    );

}

function mockUseConfig() {

    return mockedValues;

};

export { mockWithConfig, mockUseConfig, MockProvider };
