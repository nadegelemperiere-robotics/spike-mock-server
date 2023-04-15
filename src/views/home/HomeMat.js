/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# "Who Am I" part of Home page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box } from '@mui/material';

/* Website includes */
import { useMat } from '../../providers';

/* Local includes */
import { HomeGridItem } from './HomeContainers';

function HomeMat() {

    /* --------- Gather inputs --------- */
    //const componentName = 'HomeMat';
    const { mat } = useMat();

    /* ----------- Define HTML --------- */
    return (

        <HomeGridItem item xs={12} sm={12} md={8} style={{ bottom: '0px', position: 'relative' }}>
            <Box component="img" alt="The mat image." src={mat} style={{width: '100%'}}/>
        </HomeGridItem>
    );

}

export default HomeMat;
