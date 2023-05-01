/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Responsive images preloading
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 february 2021
# Latest revision: 24 february 2021
# -------------------------------------------------------*/

/* eslint-disable global-require */
const Images = {
    logo: {
        webp: {
            small: {
                img: require('../assets/320/logo.webp'),
                width: '150w',
            },
            medium: {
                img: require('../assets/768/logo.webp'),
                width: '180w',
            },
            large: {
                img: require('../assets/logo.webp'),
                width: '250w',
            },
        },
        png: {
            small: {
                img: require('../assets/320/logo.png'),
                width: '150w',
            },
            medium: {
                img: require('../assets/768/logo.png'),
                width: '180w',
            },
            large: {
                img: require('../assets/logo.png'),
                width: '250w',
            },
        },
        default: require('../assets/logo.png'),
    },
    logoWhite: {
        webp: {
            small: {
                img: require('../assets/320/logo-white.webp'),
                width: '150w',
            },
            medium: {
                img: require('../assets/768/logo-white.webp'),
                width: '180w',
            },
            large: {
                img: require('../assets/logo-white.webp'),
                width: '250w',
            },
        },
        png: {
            small: {
                img: require('../assets/320/logo-white.png'),
                width: '150w',
            },
            medium: {
                img: require('../assets/768/logo-white.png'),
                width: '180w',
            },
            large: {
                img: require('../assets/logo-white.png'),
                width: '250w',
            },
        },
        default: require('../assets/logo-white.png'),
    },
    step: {
        webp: {
            small: {
                img: require('../assets/step.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/step.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/step.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/step.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/step.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/step.png'),
                width: '2500w',
            },
        },
        default: require('../assets/step.png'),
    },
    hub: {
        webp: {
            small: {
                img: require('../assets/hub.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/hub.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/hub.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/hub.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/hub.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/hub.png'),
                width: '2500w',
            },
        },
        default: require('../assets/hub.png'),
    },
    motor: {
        webp: {
            small: {
                img: require('../assets/motor.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/motor.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/motor.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/motor.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/motor.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/motor.png'),
                width: '2500w',
            },
        },
        default: require('../assets/motor.png'),
    },
    force: {
        webp: {
            small: {
                img: require('../assets/force.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/force.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/force.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/force.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/force.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/force.png'),
                width: '2500w',
            },
        },
        default: require('../assets/force.png'),
    },
    distance: {
        webp: {
            small: {
                img: require('../assets/distance.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/distance.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/distance.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/distance.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/distance.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/distance.png'),
                width: '2500w',
            },
        },
        default: require('../assets/distance.png'),
    },
    wheel: {
        webp: {
            small: {
                img: require('../assets/wheel.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/wheel.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/wheel.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/wheel.png'),
                width: '320w',
            },
            medium: {
                img: require('../assets/wheel.png'),
                width: '768w',
            },
            large: {
                img: require('../assets/wheel.png'),
                width: '2500w',
            },
        },
        default: require('../assets/wheel.png'),
    },
};
/* eslint-enable global-require */

export default Images;
