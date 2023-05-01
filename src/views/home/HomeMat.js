/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Home mat container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box } from '@mui/material';

/* Website includes */
import { useRobot, useScenario, useConfig } from '../../providers';

/* Local includes */
import { HomeGridItem } from './HomeContainers';
import HomePosition from './HomePosition';

function HomeMat() {

    /* --------- Gather inputs --------- */
    //const componentName = 'HomeMat';
    const { position } = useRobot();
    const { mat } = useScenario();
    const { appConfig } = useConfig();
    const { scenario } = appConfig || {};
    const { mats = [] } = scenario || {};

    /* ----------- Define HTML --------- */
    return (

        <HomeGridItem item xs={12} sm={12} md={8} style={{ bottom: '0px', position: 'relative' }}>
            <Box style={{width: '100%', position: 'relative'}}>
                {(mat >= 0 && 'image' in mats[mat]) && (<Box component="img" alt="The mat image." src={mats[mat].image} style={{width: '100%'}}/>)}
                {(mat >= 0 && 'image' in mats[mat] && Object.keys(position).length !== 0) && (<HomePosition position={position} />)}
            </Box>
        </HomeGridItem>
    );

}

export default HomeMat;
