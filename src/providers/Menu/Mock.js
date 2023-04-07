/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Menu provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

const mockContextMenu = React.createContext(null);

let mockedValues = {}

function mockWithMenu(Component) {

    function ChildComponent(props) {

        /* eslint-disable react/jsx-props-no-spreading */
        return (
            <mockContextMenu.Consumer> {(contextProps) => <Component {...contextProps} {...props} /> }</mockContextMenu.Consumer>
        );
        /* eslint-enable react/jsx-props-no-spreading */

    }
    return ChildComponent;

}

function MockProvider(props) {

    const { children } = props;
 
    /* ----- Define provider values ---- */
    mockedValues = {
        toggleThis(value, newValue = null) {},
        isMenuOpen: false,
        isItemSelected: {},
        isSliding: false,
        content: {},
        icons: {},
        isDesktop: true,
        supportsWebp: true,
        ...props,
    };
    
    /* ----------- Define HTML --------- */
    return (
        <mockContextMenu.Provider value={mockedValues}>
            {children}
        </mockContextMenu.Provider>
    );

}

function mockUseMenu() {

    return mockedValues;

};

export { mockWithMenu, mockUseMenu, MockProvider };
