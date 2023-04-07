/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Configuration provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Local includes */
import ConfigContext from './Context';

function withContainer(Component) {

    function ChildComponent(props) {

        /* eslint-disable react/jsx-props-no-spreading, padded-blocks */
        return (
            <ConfigContext.Consumer>
                {(value) => {
                    const { appConfig } = value || {};
                    return <Component appConfig={appConfig} {...props} />;
                }}
            </ConfigContext.Consumer>
        );
        /* eslint-enable react/jsx-props-no-spreading, padded-blocks */

    }
    return ChildComponent;

}

export default withContainer;
