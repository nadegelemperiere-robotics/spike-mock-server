/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Home linear progress item
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Other external includes */
import styled from 'styled-components';


const HomeLinearProgressTitle = styled(Box)(() => ({
    marginRight: '10px',
    '@media all and (max-device-width: 600px)': { width: '50%' },
    '@media all and (max-device-width: 425px)': { width: '90%' },
}));

const HomeLinearProgressContainer = styled.div`
    height: 20px;
    background-color: #e0e0de;
    border-radius: 5px;
    right:0px;
    text-align:right;
    width:100%;
    '@media all and (max-device-width: 768px)': {  width:50%; },
    '@media all and (max-device-width: 425px)': {
        width:100%;
        position: absolute;
        margin-top: 15px;
    }
`;

const HomeLinearProgressContent = styled.div`
    height: 100%;
    width: 0%;
    background-color: ${(props) => props.color};
    border-radius: inherit;
    text-align: right;
    &.animation {
        transition-property: width;
        transition-duration: 3s;
        transition-timing-function: ease;
        width: ${(props) => props.value}%;
    }
`;

const HomeLinearProgressLabel = styled.span`
    padding: 0;
    font-size: 12;
    color: white;
    font-weight: bold;
    vertical-align: middle;
    line-height: normal;
`;

function HomeLinearProgressBox(props) {

    /* --------- Gather inputs --------- */
    const { value, color } = props;
    // const componentName = 'HomeLinearProgressBox';

    /* ----- Define observer to detect when
    the progress bar is visible -------- */
    /* eslint-disable brace-style */
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) { entry.target.classList.add('animation'); }
            else { entry.target.classList.remove('animation'); }

        });

    });
    /* eslint-enable brace-style */

    const setRef = (ref) => {

        const shapeRef = ref;
        if (shapeRef) { observer.observe(shapeRef); }

    };
    return (
        <HomeLinearProgressContainer ref={setRef}>
            <HomeLinearProgressContent ref={setRef} value={value} color={color}>
                <HomeLinearProgressLabel>{`${value}%`}</HomeLinearProgressLabel>
            </HomeLinearProgressContent>
        </HomeLinearProgressContainer>
    );

}

function HomeLinearProgress(props) {

    /* --------- Gather inputs --------- */
    const { color, value, text } = props;
    const theme = useTheme();
    // const componentName = 'HomeLinearProgress';

    /* ----------- Define HTML --------- */
    return (
        <Grid container style={{ marginBottom: '15px', position: 'relative' }}>
            <Grid item xs={12} sm={6} md={6}>
                <HomeLinearProgressTitle>
                    <Typography color={color} style={{ width: '100%' }}>
                        {text}
                    </Typography>
                </HomeLinearProgressTitle>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <HomeLinearProgressBox
                    style={{ flexGrow: 1 }}
                    color={theme.palette.primary.main}
                    value={value}
                />
            </Grid>
        </Grid>
    );

}

export default HomeLinearProgress;
