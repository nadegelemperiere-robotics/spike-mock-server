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
import { Box } from '@mui/material';
import { styled } from '@mui/system';

/* Website includes */
import { Image } from '../../components';

const HomePartLightMatrix = styled(Box)(({ theme, on = 0 }) => ({
    width: 22,
    height: 22,
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

function HomePartMotor(props) {

    /* --------- Gather inputs --------- */
    const { size, align} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = size + 'px';
    let positionSquare = 0;
    if (align == "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align == "left") { positionSquare = '0px'; }
    else if (align == "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (
        <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
            <Image reference="motor" style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare}}/>
        </Box>
    );

}

function HomePartDistanceSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, align} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = size + 'px';
    const heightContent = `calc(${sizeSquare} / 203 * 144)`
    const topContent = `calc((${sizeSquare} - 4px - ${heightContent})/2)`;
    let positionSquare = 0;
    if (align == "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align == "left") { positionSquare = '0px'; }
    else if (align == "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (
        <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
            <Image reference="distance" style = {{ position:'absolute', top:topContent, left: positionSquare, width: sizeSquare, height: heightContent}}/>
        </Box>
    );

}

function HomePartForceSensor(props) {
     /* --------- Gather inputs --------- */
     const { size, align} = props;

     /* --------- Compute sizes --------- */
     const sizeSquare = size + 'px';
     const widthContent  = `calc(${sizeSquare} / 4 * 3)`;
     const heightContent = `calc(${widthContent} / 157 * 81)`;
     const topContent = `calc((${sizeSquare} - 4px - ${heightContent})/2)`;
     const leftContent = `calc((${sizeSquare} - 3px - ${widthContent})/2)`;
     let positionSquare = 0;
     if (align == "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
     else if (align == "left") { positionSquare = '0px'; }
     else if (align == "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

     /* ----------- Define HTML --------- */
     return (
        <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
            <Box style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                <Image reference="force" style={{position:'absolute', width: widthContent, height: heightContent, left:leftContent, top: topContent}}/>
            </Box>
        </Box>
     );
}

function HomePartColorSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, color, align} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = size + 'px';
    let positionSquare = 0;
    if (align == "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align == "left") { positionSquare = '0px'; }
    else if (align == "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    console.log(align)
    console.log(positionSquare)


    const diameterCircle1  = `calc(${sizeSquare} / 4 * 3)`;
    const radiusCircle1  = (size / 4 * 3) / 2;
    const marginCircle = `calc((${sizeSquare} - 5px - ${sizeSquare} / 4 * 3)/2)`;
    const radiusCircle2  = (size / 4 * 3) / 2 - 3;
    const diameterCircle2  = `calc(${sizeSquare} / 4 * 3 - 6px)`;


    /* ----------- Define HTML --------- */
    return (
        <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, position:'relative'}}>
            <Box style = {{ position:'absolute', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                <Box style ={{ marginTop:marginCircle, marginLeft:marginCircle, width: diameterCircle1, height: diameterCircle1, borderRadius: radiusCircle1, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                    <Box style ={{ marginTop:1, marginLeft:1, width: diameterCircle2, height: diameterCircle2, borderRadius: radiusCircle2, borderStyle: 'solid', borderWidth:1, borderColor: '#aaaaaa', backgroundColor:color}}>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

export { HomePartLightMatrix, HomePartColorSensor, HomePartMotor, HomePartForceSensor, HomePartDistanceSensor };
