/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Desktop content frame definition (not to be visible !)
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

function MobileContent(props) {

    /* --------- Gather inputs --------- */
    const { top = '95px', left = '20px', height = '100vw', width = '100%' } = props || {};

    /* ----------- Define HTML --------- */
    return (
        <div>
            <div
                id="content"
                style={{
                    width,
                    height,
                    position: 'fixed',
                    backgroundColor: 'black',
                    marginTop: top,
                    marginLeft: left,
                    flexDirection: 'row',
                    overflow: 'hidden',
                    zIndex: '0',
                }}
            />
        </div>
    );

}

export default MobileContent;
