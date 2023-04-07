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
import { Stack, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useRobot } from '../../providers';
import { Image } from '../../components';

/* Local includes */
import { HomeGridItem } from './HomeContainers';
import { HomePartLightMatrix, HomePartColorSensor, HomePartMotor, HomePartForceSensor, HomePartDistanceSensor } from './HomeParts';

function HomeRobot() {

    /* --------- Gather inputs --------- */
    //const componentName = 'HomeRobot';
    const theme = useTheme();
    const { components } = useRobot();

    const components_up = [{},{},{}]
    const components_down = [{},{},{}]

    function format_item(item, align) {

        const component = item
        component['align'] = align
        if (item.type === 'ColorSensor') {

            const hex = (0x1000000 + (item.red << 16) + (item.green << 8) + item.blue).toString(16).slice(1);
            component['color'] = `#${hex}`;
            component['text'] = `#${hex}`;

        }
        if (item.type === 'Motor') {

            component['text'] = item.degrees.toString()
            component['text'] = `${component['text']}°`

        }
        return component

    }
    components.forEach((item) => {

        if (item.type !== 'Wheel' && item.type !== 'Hub') {

            if (item.port === 'A') { components_down[0] = format_item(item,'left') }
            if (item.port === 'B') { components_up[0] = format_item(item,'left') }
            if (item.port === 'C') { components_down[1] = format_item(item,'center') }
            if (item.port === 'D') { components_up[1] = format_item(item,'center') }
            if (item.port === 'E') { components_down[2] = format_item(item,'right') }
            if (item.port === 'F') { components_up[2] = format_item(item,'right') }

        }

    })

    /* ----------- Define HTML --------- */
    return (
        <HomeGridItem item xs={12} sm={4} md={4} style={{ bottom: '0px', right:'10px', position: 'relative' }}>
            <Stack direction="column" justifyContent="space-between" >
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '100%', right: '0%' }}>
                    <Stack direction="row" justifyContent="space-between">
                        { components_up.map((item) => {

                            return(
                                <Container key={item.port} style={{ width:'100%', paddingLeft: '0px', paddingRight: '0px' }}>
                                    {(item.type === 'ColorSensor') && ( <HomePartColorSensor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'ForceSensor') && ( <HomePartForceSensor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'Motor') && ( <HomePartMotor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'DistanceSensor') && ( <HomePartDistanceSensor size="40" color={item.color} align={item.align}/>)}
                                    <Typography style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}> {item.text} </Typography>
                                </Container>
                            )

                        })}
                    </Stack>
                </Container>
                <Container style={{ position:'relative', top: '10px', width: '100%', right: '0%' }}>
                    <Image reference="hub" style={{ zIndex: '0', width: '100%', objectFit: 'contain', overflow: 'hidden', backgroundColor: '#ffffff' }} />
                    <Container style={{ position: 'absolute', zIndex: '1', top: '27%', left: '22%', width: '100%', right: '0%' }}>
                        <Stack direction="column" style={{ marginBottom: '0px', marginTop: '0px' }}>
                            <Stack direction="row" style={{ marginBottom: '0px', marginTop: '0px'}}>
                                <HomePartLightMatrix theme={theme}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme}/>
                                <HomePartLightMatrix theme={theme}/>
                            </Stack>
                            <Stack direction="row" style={{ marginBottom: '0px', marginTop: '0px' }}>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme}/>
                            </Stack>
                            <Stack direction="row" style={{ marginBottom: '0px', marginTop: '0px' }}>
                                <HomePartLightMatrix theme={theme}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                            </Stack>
                            <Stack direction="row" style={{ marginBottom: '0px', marginTop: '0px' }}>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme}/>
                            </Stack>
                            <Stack direction="row" style={{ marginBottom: '0px', marginTop: '0px' }}>
                                <HomePartLightMatrix theme={theme}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme} on={1}/>
                                <HomePartLightMatrix theme={theme}/>
                                <HomePartLightMatrix theme={theme}/>
                            </Stack>
                        </Stack>
                    </Container>
                </Container>
                <Container style={{ position:'relative', top: '10px', width: '100%', right: '0%'}}>
                    <Stack direction="row" justifyContent="space-between">
                        { components_down.map((item) => {

                            return(
                                <Container key={item.port} style={{ width:'100%', paddingLeft: '0px', paddingRight: '0px' }}>
                                    {(item.type === 'ColorSensor') && ( <HomePartColorSensor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'ForceSensor') && ( <HomePartForceSensor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'Motor') && ( <HomePartMotor size="40" color={item.color} align={item.align}/>)}
                                    {(item.type === 'DistanceSensor') && ( <HomePartDistanceSensor size="40" color={item.color} align={item.align}/>)}
                                    <Typography style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}> {item.text} </Typography>
                                </Container>
                            );

                        })}
                    </Stack>
                </Container>
            </Stack>
        </HomeGridItem>
    );

}

export default HomeRobot;
