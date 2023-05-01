/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Home code container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useState, useEffect } from 'react';

/* Material UI includes */
import { TextField, Container, Typography, Stack, IconButton } from '@mui/material';
import { PlayCircle as PlayCircleIcon, StopCircle as StopCircleIcon } from '@mui/icons-material';

/* Website includes */
import logMessage from '../../utils/logging';
import { useCode } from '../../providers';

/* Local includes */
import { HomeGridItem } from './HomeContainers';

function HomeCode() {

    /* --------- Gather inputs --------- */
    const componentName = 'HomeCode';
    const { changeCode, code, error } = useCode();
    const rowNumber = 20;

    const [scrollTarget, setScrollTarget] = useState(undefined)
    const [numberedLines, setLines] = useState(Array.from({length: rowNumber}, (x, i) => i + 1))

    /* eslint-disable padded-blocks, brace-style */
    const handleChange = (event) => {

        logMessage(componentName, 'handleChange --- BEGIN');
        changeCode(event.target.value);
        logMessage(componentName, 'handleChange --- END');

    };
    /* eslint-disable padded-blocks, brace-style */

    /* ----- Manage command ---- */
    const handlePlayClick = (event) => {

        logMessage(componentName, 'handlePlayClick --- BEGIN');
        fetch('v1/command/start', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({code:code}),
        })
            .catch((err) => { console.log(err.message); });
        logMessage(componentName, 'handlePlayClick --- END');

    };

    const handleStopClick = (event) => {
        fetch('v1/command/stop',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: "",
        })
            .catch((err) => { console.log(err.message); });
    }

    useEffect(() => {
        logMessage(componentName, 'useEffect[scrollTarget, code] --- BEGIN');
        function change_position()
        {
            const lines = code.split(/\r\n|\r|\n/).length
            const lineSize = scrollTarget.scrollHeight / lines
            const topLine = Math.round(scrollTarget.scrollTop / lineSize)
            scrollTarget.scrollTop = topLine * lineSize
            setLines(Array.from({length: rowNumber}, (x, i) => i + 1 + topLine));
        }
        if (scrollTarget)
        {
            scrollTarget.addEventListener('scroll', change_position);
            return () => scrollTarget.removeEventListener('scroll', change_position);
        }
        logMessage(componentName, 'useEffect[scrollTarget, code] --- END');
    },[scrollTarget, code]);


    /* ----------- Define HTML --------- */
    return (
        <HomeGridItem item xs={12} sm={12} md={12} style={{ position:'relative', bottom: '0px', top:'0px'}}>
            <Stack direction="row" justifyContent="space-between" >
                <Container style={{ position:'relative', zIndex: '1', top: '17px', left: '0%', width: '30px', right: '0%' }}>
                    { numberedLines.map((item) => {
                        return(
                            <Typography key={item} style={{lineHeight:'1.4375em', fontSize:'14px', color:'#999999', fontWeight:'600'}}>{item}</Typography>
                        )
                    })}
                </Container>
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '100%', right: '0%' }}>
                    <TextField multiline ref={node => { if (node) { setScrollTarget(node.children[1].children[0]) }}} placeholder="" label="Code" value={code} onChange={handleChange} rows={rowNumber} style={{width: '100%'}}/>
                </Container>
            </Stack>
            <Stack direction="row" justifyContent="right" >
                <Container style={{ position:'relative', zIndex: '1', top: '0%', left: '0%', width: '30px', right: '0%' }}>
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography></Typography>
                </Container>
                <Typography style={{width: '100%'}}> {error} </Typography>
                <IconButton onClick={handleStopClick}>
                    <StopCircleIcon sx={{color: "#ff8086"}} style={{ width:'60px', height:'60px'}}/>
                </IconButton>
                <IconButton onClick={handlePlayClick}>
                    <PlayCircleIcon color="primary" style={{ width:'60px', height:'60px' }}/>
                </IconButton>
            </Stack>
        </HomeGridItem>
    );

}

export default HomeCode;
