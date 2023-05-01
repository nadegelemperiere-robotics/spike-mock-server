/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Tests suite setup
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Jest includes */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

});
