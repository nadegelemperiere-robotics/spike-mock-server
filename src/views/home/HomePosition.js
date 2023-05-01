/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Home position on mat drawing component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box} from '@mui/material';

function HomePosition(props) {

    /* --------- Gather inputs --------- */
    const { position } = props;

    console.log(position)

    var fly  = Math.round(position.frontleft.y * 10000) / 100
    fly  = `${fly}`
    var flx  = Math.round(position.frontleft.x * 10000) / 100
    flx  = `${flx}`
    var fry  = Math.round(position.frontright.y * 10000) / 100
    fry  = `${fry}`
    var frx  = Math.round(position.frontright.x * 10000) / 100
    frx  = `${frx}`
    var bly  = Math.round(position.backleft.y * 10000) / 100
    bly  = `${bly}`
    var blx  = Math.round(position.backleft.x * 10000) / 100
    blx  = `${blx}`
    var bry  = Math.round(position.backright.y * 10000) / 100
    bry  = `${bry}`
    var brx  = Math.round(position.backright.x * 10000) / 100
    brx  = `${brx}`

    var north = Math.round(position.center.north * 100) / 100
    var east = Math.round(position.center.east * 100) / 100
    var yaw = Math.round(position.center.yaw * 100) / 100

    const points = `${flx},${fly},${frx},${fry},${brx},${bry},${blx},${bly}`

    return (
        <Box style={{ position:'absolute', zIndex: '1', top:0, left:0, width:'100%', height:'100%'}}>
            <Box style={{ position:'absolute', zIndex: '2', top:0, left:0, width:'100%', height:'100%'}}>
                <svg width='100%' xmlns="http://www.w3.org/2000/svg">
                    <text x="10" y="15" style={{font: 'bold 10px sans-serif', fill: 'red'}}>North: {north} cm</text>
                    <text x="10" y="30" style={{font: 'bold 10px sans-serif', fill: 'red'}}>East: {east} cm</text>
                    <text x="10" y="45" style={{font: 'bold 10px sans-serif', fill: 'red'}}>Yaw: {yaw}°</text>
                </svg>
            </Box>
            <Box style={{ position:'absolute', zIndex: '3', top:0, left:0, width:'100%', height:'100%'}}>
                <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1={flx} y1={fly} x2={frx} y2={fry} stroke="red" stroke-width="0.2"/>
                    <polygon points={points} fill="rgba(255,0,0,0.3)" />
                </svg>
            </Box>
        </Box>
    )

}

export default HomePosition;
