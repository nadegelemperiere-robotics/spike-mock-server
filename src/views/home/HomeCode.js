/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# H"What I Do" part of Home page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { TextField, Container, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PlayCircle as PlayCircleIcon, StopCircle as StopCircleIcon } from '@mui/icons-material';

/* Local includes */
import { HomeGridItem } from './HomeContainers';

function HomeCode() {

    /* --------- Gather inputs --------- */
    const componentName = 'HomeCode';
    const theme = useTheme();

    /* ----------- Define HTML --------- */
    return (
        <HomeGridItem item xs={12} sm={12} md={12} style={{ position:'relative', bottom: '0px', top:'0px'}}>
            <Stack direction="row" justifyContent="space-between" >
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '30px', right: '0%' }}>
                    <Typography>1</Typography>
                    <Typography>2</Typography>
                    <Typography>3</Typography>
                </Container>
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '100%', right: '0%' }}>
                    <TextField multiline label="Code" rows={20} style={{width: '100%'}}/>
                </Container>
            </Stack>
            <Stack direction="row" justifyContent="right" >
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '30px', right: '0%' }}>
                    <Typography>1</Typography>
                    <Typography>2</Typography>
                    <Typography>3</Typography>
                </Container>
                <Typography style={{width: '100%'}}> Console </Typography>
                <StopCircleIcon sx={{color: "#ff8086"}} style={{ width:'60px', height:'60px'}}/>
                <PlayCircleIcon color="primary" style={{ width:'60px', height:'60px' }}/>
            </Stack>
        </HomeGridItem>
    );

}

export default HomeCode;
