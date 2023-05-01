/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike hub button component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { ButtonBase } from '@mui/material';

function PartButton(props) {

    /* --------- Gather inputs --------- */
    const { is_pressed, onClick, onRelease } = props;

    return (
        <ButtonBase onMouseDown={onClick} onMouseUp={onRelease} style={{ width:'100%', height:'100%', backgroundColor: is_pressed ? `rgba(255,0,0,0.5)` : `rgba(255,255,255,0)`, '&.active': { backgroundColor: is_pressed ? `rgba(255,0,0,0.5)` : `rgba(255,255,255,0)`}}}>
        </ButtonBase>
    )

}

export default PartButton;