/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Responsive image handling srcset, webp and fallbacks
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 february 2022
# Latest revision: 24 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Website includes */
import { useConfig } from '../../providers';

function Image(props) {

    /* --------- Gather inputs --------- */
    const { reference, style } = props;
    const { appConfig } = useConfig();
    const { images } = appConfig;
    const data = images[reference];

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <picture>
            { Object.entries(data).map((item) => {

                let result;
                const localType = `image/${item[0]}`;
                const localSizes = Object.entries(item[1]);
                let localSrcset = '';
                for (let i = 0; i < localSizes.length; i += 1) {
                    localSrcset = `${localSrcset} ${localSizes[i][1].img} ${localSizes[i][1].width} ,`;
                }
                if (item[0] !== 'default') {
                    result = (<source key={item[0]} srcSet={localSrcset} type={localType} />);
                }
                return result;
            })}
            <img src={data.default} style={style} alt={reference} />
        </picture>
    );
    /* eslint-enable padded-blocks */

}

export default Image;
