/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Robot part of Home page
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Stack, Container, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useRobot } from '../../providers';
import { Image } from '../../components';
import logMessage from '../../utils/logging';

/* Local includes */
import { HomeGridItem } from './HomeContainers';
import { HomePartLightMatrix, HomePartSpeaker, HomePartColorSensor, HomePartMotor, HomePartForceSensor, HomePartDistanceSensor, HomePartStatusLight, HomePartButton } from './HomeParts';

function HomeRobot() {

    /* --------- Gather inputs --------- */
    //const componentName = 'HomeRobot';
    const theme = useTheme();
    const { components, hub } = useRobot();
    const statusLightWidth = `calc((100% - 48px) * 20 / 1000 )`
    const statusLightHorizontalMargin = `calc((100% - 48px) * 50 / 1000 + 24px)`
    const lightMatrixWidth = `calc((100% - 48px) * 400 / 1000)`
    const lightMatrixHorizontalMargin = `calc((100% - 48px) * 300 / 1000 + 24px)`
    const hubHeight = `calc(100% * 400 / 1105)`
    const hubVerticalMargin = `calc(100% * (1105 - 400) / 2 / 1105)`
    const buttonWidth = `calc((100% - 48px) * 120 / 1000)`
    const buttonHorizontalMargin = `calc((100% - 48px) * 810 / 1000 + 24px)`
    const speakerWidth = `calc((100% - 48px) * 120 / 1000)`
    const componentName = 'HomeRobot';
    console.log(hub)

    const components_up = [{},{},{}]
    const components_down = [{},{},{}]

    function format_item(item, align) {

        const component = item
        component['align'] = align
        if (item.type === 'ColorSensor') {

            const hex = (0x1000000 + (item.red << 16) + (item.green << 8) + item.blue).toString(16).slice(1);
            component['color'] = `#${hex}`;
            component['text'] = `${hex}`;

        }
        if (item.type === 'Motor') {

            component['text'] = Math.round(item.degrees.toString())

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

    const handleStopClick = (event) => {

        logMessage(componentName, 'handleStopClick --- BEGIN');
        fetch('v1/command/stop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: "",
        })
            .catch((err) => { logMessage(componentName, err.message); });
        logMessage(componentName, 'handleStopClick --- END');

    }

    const handleButtonClick = (side) => (event) => {

        logMessage(componentName, 'handleButtonClick --- BEGIN');
        fetch(`v1/command/button/push/${side}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain',
            },
            body: "toto",
        })
            .catch((err) => { logMessage(componentName, err.message); });
        logMessage(componentName, 'handleButtonClick --- END');

    }

    const handleButtonRelease = (side) => (event) => {

        logMessage(componentName, 'handleButtonRelease --- BEGIN');
        fetch(`v1/command/button/release/${side}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain',
            },
            body: "toto",
        })
            .catch((err) => { logMessage(componentName, err.message); });
        logMessage(componentName, 'handleButtonRelease --- END');

    }

    /* ----------- Define HTML --------- */
    return (

        <HomeGridItem item xs={12} sm={12} md={4} style={{ bottom: '0px', right:'10px', position: 'relative' }}>
            <Stack direction="row" justifyContent="center" alignItems="stretch">
                <Stack direction="column" justifyContent="space-between" style={{width:'100%', maxWidth:'500px'}}>
                    <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '100%', right: '0%' }}>
                        <Stack direction="row" justifyContent="space-between">
                            { components_up.map((item) => {

                                return(
                                    <Container key={item.port} style={{ width:'100%', paddingLeft: '0px', paddingRight: '0px' }}>
                                        {(item.type === 'ColorSensor') && ( <HomePartColorSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'ForceSensor') && ( <HomePartForceSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'Motor') && ( <HomePartMotor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'DistanceSensor') && ( <HomePartDistanceSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                    </Container>
                                )

                            })}
                        </Stack>
                    </Container>
                    <Container style={{ position:'relative', top: '10px', width: '100%', right: '0%' }}>
                        <Image reference="hub" style={{ zIndex: '0', width: '100%', objectFit: 'contain', overflow: 'hidden', backgroundColor: '#ffffff' }} />
                        <Container style={{ position: 'absolute', zIndex: '1', margin:'0', top: hubVerticalMargin, left: statusLightHorizontalMargin, width: statusLightWidth, height: hubHeight, right: 0, padding: '0', bottom:hubVerticalMargin }}>
                            <HomePartStatusLight height='20%' width='100%' top='50%' color={hub.statuslight.color} on={hub.statuslight.on}/>
                        </Container>
                        <Container style={{ position: 'absolute', zIndex: '1', margin:'0', top: hubVerticalMargin, left: lightMatrixHorizontalMargin, width: lightMatrixWidth, height: hubHeight, right: lightMatrixHorizontalMargin, padding: '0', bottom:hubVerticalMargin }}>
                            <Stack direction="column" alignItems="center" style={{ marginBottom: '0px', marginTop: '0px', height:'100%', bottom:'0px' }}>
                                {[...Array(5).keys()].map((item) => {

                                    return (
                                        <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '1px', marginTop: '1px', height:'100%', width:'100%'}}>
                                            {[...Array(5).keys()].map((jtem) => {

                                                let is_on = 0
                                                if (hub.lightmatrix && hub.lightmatrix[jtem][4 - item]) { is_on = 1}
                                                return(
                                                    <HomePartLightMatrix theme={theme} on={is_on} width='20%' height='100%'/>
                                                )

                                            })}
                                        </Stack>
                                    )

                                })}
                            </Stack>
                        </Container>
                        <Container style={{ position: 'absolute', zIndex: '1', margin:'0', top: hubVerticalMargin, left: buttonHorizontalMargin, width: buttonWidth, height: hubHeight, right: buttonHorizontalMargin, padding: '0', bottom:hubVerticalMargin }}>
                            <Stack direction="column" alignItems="center" justifyContent="space-between" style={{ marginBottom: '0px', marginTop: '0px', height:'100%', bottom:'0px' }}>
                                <HomePartButton onClick={handleButtonClick('right')} onRelease={handleButtonRelease('right')} is_pressed={hub.buttons[1].pressed}/>
                                <ButtonBase onClick={handleStopClick} style={{ width:'100%', height:'100%' }}></ButtonBase>
                                <HomePartButton onClick={handleButtonClick('left')} onRelease={handleButtonRelease('left')} is_pressed={hub.buttons[0].pressed}/>
                            </Stack>
                        </Container>
                    </Container>
                    <Container style={{ position:'relative', top: '10px', width: '100%', right: '0%'}}>
                        <Stack direction="row" justifyContent="space-between">
                            { components_down.map((item) => {

                                return(
                                    <Container key={item.port} style={{ width:'100%', paddingLeft: '0px', paddingRight: '0px' }}>
                                        {(item.type === 'ColorSensor') && ( <HomePartColorSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'ForceSensor') && ( <HomePartForceSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'Motor') && ( <HomePartMotor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                        {(item.type === 'DistanceSensor') && ( <HomePartDistanceSensor size="40" color={item.color} align={item.align} text={item.text}/>)}
                                    </Container>
                                );

                            })}
                        </Stack>
                    </Container>
                </Stack>
                <Container style={{ margin:0, width:speakerWidth, padding:0, bottom:0}}>
                    <Container style={{ position:'relative', margin:0, top: `calc(50% - 24px)`, left: 0, width: '100%', padding: 0 }}>
                        <HomePartSpeaker color={theme.palette.secondary.main} size='24px' on={hub.speaker.beeping} note={hub.speaker.note} volume={hub.speaker.volume}/>
                    </Container>
                </Container>
            </Stack>
        </HomeGridItem>
    );

}

export default HomeRobot;
