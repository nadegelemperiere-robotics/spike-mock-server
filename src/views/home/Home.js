/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Home page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { Page } from '../../containers';
import { useConfig } from '../../providers';

/* Local includes */
import { HomeGridContainer } from './HomeContainers';

import HomeMat from './HomeMat';
import HomeRobot from './HomeRobot';
import HomeCode from './HomeCode';


function Home() {

    /* --------- Gather inputs --------- */
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { height = '115px' } = menu || {};
    const theme = useTheme();
    //const componentName = 'Home';

    /* -------- Defining sizes --------- */
    const topString = height;

    /* ----------- Define HTML --------- */
    return (
        <Page pageTitle="spike-mock">
            <Box style={{ backgroundColor: '#ffffff', height: topString }} />
            <Box style={{ position: 'relative', top: 0 }}>
                <HomeCode />
            </Box>
            <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%', height:'20px' }}/>
            <Box id="map">
                <HomeGridContainer container spacing={3}>
                    <HomeMat />
                    <HomeRobot/>
                </HomeGridContainer>
            </Box>
        </Page>
    );


}

export default Home;
