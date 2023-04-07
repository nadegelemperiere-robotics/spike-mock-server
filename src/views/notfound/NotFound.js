/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Not found page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box, Container, Typography } from '@mui/material';
import { useConfig, useMenu } from '../../providers';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { Page } from '../../containers';
import { Image } from '../../components';

function NotFound() {

    /* --------- Gather inputs --------- */
    const { isDesktop } = useMenu();
    const { appConfig } = useConfig();
    const { menu } = appConfig || {};
    const { height = '115px', margin = '20px' } = menu || {};
    const theme = useTheme();

    /* -------- Defining sizes --------- */
    let topString = 0;
    if (!isDesktop) { topString = height; }
    let heightImage = `calc(100vh - ${margin})`
    if (!isDesktop) { heightImage = `calc(100vh - ${topString})` }

    /* ----------- Define HTML --------- */
    return (
        <Page pageTitle="NotFound">
            <Box style={{ backgroundColor: 'black', height: topString, top:0 }} />
            <Container style={{ width:'100%', height:heightImage, padding:0, '@media':{padding:0} }}>
                <Box style={{ backgroundColor: 'rgba(255,255,255,0)', height: '18%', top:0 }} />
                <Image reference="step" style={{ width: '20%', objectFit: 'content', overflow: 'hidden' }} />
                <Container style={{ zIndex: '1', top: '18%', left: '10%', width: '80%', right: '10%', '@media':{padding:0} }}>
                    <Typography style={{ color:theme.palette.primary.main, textAlign:'center', fontSize: '30px'}}>
                        You seem to have stepped on a lego!
                    </Typography>
                </Container>
            </Container>
        </Page>
    );

}

export default NotFound;
