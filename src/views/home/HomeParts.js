/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Home styled containers
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2021
# Latest revision: 02 february 2021
# -------------------------------------------------------*/

/* Material UI includes */
import { Box, ButtonBase, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { MusicNote as MusicNoteIcon, VolumeUp as VolumeUpIcon } from '@mui/icons-material';

/* Website includes */
import { Image } from '../../components';

const HomePartLightMatrix = styled(Box)(({ theme, on = 0, width=22, height=22 }) => ({
    width: width,
    height: height,
    minHeight: height,
    borderRadius: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: on ? theme.palette.primary.main : '#eeeeee',
}));

const HomePartStatusLight = styled(Box)(({ top, width=10, height=22, color, on }) => ({
    width: width,
    height: height,
    minHeight: height,
    borderRadius: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1,
    top: top,
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: on ? color : `rgba(255,255,255,0)`,
}));

function HomePartButton(props) {

    /* --------- Gather inputs --------- */
    const { is_pressed, onClick, onRelease } = props;
    console.log(props)

    return (
        <ButtonBase onMouseDown={onClick} onMouseUp={onRelease} style={{ width:'100%', height:'100%', backgroundColor: is_pressed ? `rgba(255,0,0,0.5)` : `rgba(255,255,255,0)`, '&.active': { backgroundColor: is_pressed ? `rgba(255,0,0,0.5)` : `rgba(255,255,255,0)`}}}>
        </ButtonBase>
    )

}

function HomePartMotor(props) {

    /* --------- Gather inputs --------- */
    const { size, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (
        <Stack direction="column">
            <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
                <Image reference="motor" style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare}}/>
            </Box>
            <Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> {text}° </Typography>
        </Stack>
    );

}

function HomePartDistanceSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    const heightContent = `calc(${sizeSquare} / 203 * 144)`
    const topContent = `calc((${sizeSquare} - 4px - ${heightContent})/2)`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (

        <Stack direction="column">
            <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
                <Image reference="distance" style = {{ position:'absolute', top:topContent, left: positionSquare, width: sizeSquare, height: heightContent}}/>
            </Box>
            <Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> {text} </Typography>
        </Stack>
    );

}

function HomePartForceSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    const widthContent  = `calc(${sizeSquare} / 4 * 3)`;
    const heightContent = `calc(${widthContent} / 157 * 81)`;
    const topContent = `calc((${sizeSquare} - 4px - ${heightContent})/2)`;
    const leftContent = `calc((${sizeSquare} - 3px - ${widthContent})/2)`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (
        <Stack direction="column">
            <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
                <Box style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                    <Image reference="force" style={{position:'absolute', width: widthContent, height: heightContent, left:leftContent, top: topContent}}/>
                </Box>
            </Box>
            <Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> {text} </Typography>
        </Stack>
    );

}

function HomePartColorSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, color, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    const diameterCircle1  = `calc(${sizeSquare} / 4 * 3)`;
    const radiusCircle1  = (size / 4 * 3) / 2;
    const marginCircle = `calc((${sizeSquare} - 5px - ${sizeSquare} / 4 * 3)/2)`;
    const radiusCircle2  = (size / 4 * 3) / 2 - 3;
    const diameterCircle2  = `calc(${sizeSquare} / 4 * 3 - 6px)`;


    /* ----------- Define HTML --------- */
    return (

        <Stack direction="column">
            <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
                <Box style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                    <Box style ={{ marginTop:marginCircle, marginLeft:marginCircle, width: diameterCircle1, height: diameterCircle1, borderRadius: radiusCircle1, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                        <Box style ={{ marginTop:1, marginLeft:1, width: diameterCircle2, height: diameterCircle2, borderRadius: radiusCircle2, borderStyle: 'solid', borderWidth:1, borderColor: '#aaaaaa', backgroundColor:color}}>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> #{text} </Typography>
        </Stack>
    );

}

function HomePartSpeaker(props) {

    /* --------- Gather inputs --------- */
    const { note, volume, on, color, size} = props;

    const sz = {size}/2

    /* ----------- Define HTML --------- */
    return (
        <Stack direction="column">
            {(on) && ( <Stack direction="row" >
                <Box>
                    <MusicNoteIcon sx={{color: {color}, width:{sz}, height:{sz}}}/>
                </Box>
                <Typography> {note} </Typography>
            </Stack>)}
            {(on) && ( <Stack direction="row" >
                <Box>
                    <VolumeUpIcon sx={{color: {color}, width:{sz}, height:{sz}}}/>
                </Box>
                <Typography> {volume} </Typography>
            </Stack>)}
        </Stack>
    );

}

export { HomePartLightMatrix, HomePartStatusLight, HomePartSpeaker, HomePartColorSensor, HomePartMotor, HomePartForceSensor, HomePartDistanceSensor, HomePartButton };
