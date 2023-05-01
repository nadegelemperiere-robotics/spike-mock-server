/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike hub speaker component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box, Typography, Stack } from '@mui/material';
import { MusicNote as MusicNoteIcon, VolumeUp as VolumeUpIcon } from '@mui/icons-material';

function PartSpeaker(props) {

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

export default PartSpeaker;