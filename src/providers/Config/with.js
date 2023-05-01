/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Cnfig provider with
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
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
