/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Rendering portal
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 february 2022
# Latest revision: 01 february 2022
# -------------------------------------------------------*/

/* Jest includes */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

});
