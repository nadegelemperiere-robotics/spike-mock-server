/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Robot provider exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import { useContext } from 'react';

/* Local includes */
import RobotContext from './Context';
import Provider from './Provider';
import withRobot from './with';

/* eslint-disable padded-blocks */
function useRobot() {
    return useContext(RobotContext);
}
/* eslint-enable padded-blocks */

export { withRobot, useRobot };
export default Provider;
