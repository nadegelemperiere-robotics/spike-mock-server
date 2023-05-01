/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike force sensor component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box, Stack, Typography } from '@mui/material';

/* Website includes */
import { Image } from '..';


function PartForceSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    const widthContent  = `calc(${sizeSquare} * 3 / 4 )`;
    const heightContent = `calc(${widthContent} * 81 / 157 )`;
    const topContent = `calc((${sizeSquare} - ${heightContent})/2)`;
    const leftContent = `calc((${sizeSquare} - ${widthContent})/2)`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    /* ----------- Define HTML --------- */
    return (
        <Stack direction="column" style={{width:'100%'}}>
            <Box style={{ width:'100%', boxSizing: 'content-box', minHeight:sizeSquare, right:0, left:0, border:0, position:'relative'}}>
                <Box style = {{ position:'absolute', boxSizing: 'content-box', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                    <Image reference="force" style={{position:'absolute', width: widthContent, height: heightContent, left:leftContent, top: topContent}}/>
                </Box>
            </Box>
            {(text !== undefined && text.length > 0) && (<Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> {text} </Typography>)}
        </Stack>
    );

}

export default PartForceSensor;