/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings accordion customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/system';


const SettingsAccordion = styled(Accordion)(() => ({
    width: '100%',
    border: 0,
}));

const SettingsAccordionSummary= styled(AccordionSummary)(({col}) => ({
    border: 0,
    margin: 0,
    width:'100%',
    '.Mui-expanded &' : {
        color: 'white',
        backgroundColor: col,
        margin: 0,
    },
    '.Mui-expanded > p': {
        color: 'white',
        fontWeight: 'bold',
    },
}));

const SettingsAccordionDetails= styled(AccordionDetails)(() => ({
    border:0,
    width:'100%',
}));



export {SettingsAccordion, SettingsAccordionSummary, SettingsAccordionDetails};