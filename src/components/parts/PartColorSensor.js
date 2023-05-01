/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike color sensor component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box, Typography, Stack } from '@mui/material';

function PartColorSensor(props) {

    /* --------- Gather inputs --------- */
    const { size, color, align, text} = props;

    /* --------- Compute sizes --------- */
    const sizeSquare = `${size}px`;
    let positionSquare = 0;
    if (align === "center") { positionSquare = `calc((100% - ${sizeSquare}) / 2)`; }
    else if (align === "left") { positionSquare = '0px'; }
    else if (align === "right") { positionSquare = `calc(100% - ${sizeSquare})`; }

    const diameterCircle1  = `calc(${sizeSquare} * 3 / 4)`;
    const radiusCircle1  = (size * 3 / 4 ) / 2;
    const marginCircle = `calc((${sizeSquare} - ${sizeSquare} * 3 / 4 )/2 - 2px )`;
    const radiusCircle2  = (size * 3 / 4 ) / 2 - 3;
    const diameterCircle2  = `calc(${sizeSquare} * 3 / 4 - 6px)`;
    const marginCircle2 =  `calc(2px)`;

    /* ----------- Define HTML --------- */
    return (

        <Stack direction="column" style={{width:'100%'}}>
            <Box style={{ width:'100%', minHeight:sizeSquare, right:0, left:0, margin:0, position:'relative'}}>
                <Box style = {{ position:'absolute', boxSizing: 'content-box', left: positionSquare, width: sizeSquare, height: sizeSquare, borderRadius: 5, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                    <Box style ={{ position:'relative', boxSizing: 'content-box', top:marginCircle, left:marginCircle, width: diameterCircle1, height: diameterCircle1, borderRadius: radiusCircle1, borderStyle: 'solid', borderWidth:2, borderColor: '#aaaaaa'}}>
                        <Box style ={{ position:'relative', boxSizing: 'content-box', top:marginCircle2, left:marginCircle2, width: diameterCircle2, height: diameterCircle2, borderRadius: radiusCircle2, borderStyle: 'solid', borderWidth:1, borderColor: '#aaaaaa', backgroundColor:color}}>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {( text !== undefined && text.length > 0) && (<Typography style={{ width: '100%', textAlign: align, fontWeight: 'bold', marginBottom: '10px' }}> #{text} </Typography>)}
        </Stack>
    );

}

export default PartColorSensor;