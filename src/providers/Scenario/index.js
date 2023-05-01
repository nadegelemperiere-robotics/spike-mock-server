/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Scenario provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/


/* React includes */
import { useContext } from 'react';

/* Local includes */
import ScenarioContext from './Context';
import Provider from './Provider';
import withScenario from './with';

/* eslint-disable padded-blocks */
function useScenario() {
    return useContext(ScenarioContext);
}
/* eslint-enable padded-blocks */

export { withScenario, useScenario};
export default Provider;
