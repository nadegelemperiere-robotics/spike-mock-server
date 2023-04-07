/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Robot provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
