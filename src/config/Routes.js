/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Routes loading
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 february 2021
# Latest revision: 03 february 2021
# -------------------------------------------------------*/

/* React includes */
import React, { lazy } from 'react';

/* Local includes */
import RoutesConfig from './data/routes.json';

const Routes = [];
const array = Object.entries(RoutesConfig);
for (let i = 0; i < array.length; i += 1) {

    const Element = lazy(() => import(`../views/${array[i][1].element.toLowerCase()}/${array[i][1].element}`));
    const rt = {
        exact: true,
        path: array[i][1].path,
        element: <Element />,
    };
    Routes.push(rt);

}

export default Routes;
