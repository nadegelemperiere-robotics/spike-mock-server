/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Responsive images preloading
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 february 2021
# Latest revision: 24 february 2021
# -------------------------------------------------------*/

/* eslint-disable global-require */
const Images = {
    background: {
        webp: {
            small: {
                img: require('../assets/320/background.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/background.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/background.webp'),
                width: '1500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/background.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/background.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/background.jpg'),
                width: '1500w',
            },
        },
        default: require('../assets/background.jpg'),
    },
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
    home: {
        webp: {
            small: {
                img: require('../assets/320/home.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/home.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/home.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/home.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/home.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/home.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/home.jpg'),
    },
    homeintroen: {
        webp: {
            small: {
                img: require('../assets/320/home-intro-en.webp'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/home-intro-en.webp'),
                width: '320w',
            },
            large: {
                img: require('../assets/home-intro-en.webp'),
                width: '500w',
            },
        },
        png: {
            small: {
                img: require('../assets/320/home-intro-en.png'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/home-intro-en.png'),
                width: '320w',
            },
            large: {
                img: require('../assets/home-intro-en.png'),
                width: '500w',
            },
        },
        default: require('../assets/home-intro-en.png'),
    },
    homeintrofr: {
        webp: {
            small: {
                img: require('../assets/320/home-intro-fr.webp'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/home-intro-fr.webp'),
                width: '320w',
            },
            large: {
                img: require('../assets/home-intro-fr.webp'),
                width: '500w',
            },
        },
        png: {
            small: {
                img: require('../assets/320/home-intro-fr.png'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/home-intro-fr.png'),
                width: '320w',
            },
            large: {
                img: require('../assets/home-intro-fr.png'),
                width: '500w',
            },
        },
        default: require('../assets/home-intro-fr.png'),
    },
    landscape: {
        webp: {
            small: {
                img: require('../assets/320/landscape.webp'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/landscape.webp'),
                width: '320w',
            },
            large: {
                img: require('../assets/landscape.webp'),
                width: '500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/landscape.jpg'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/landscape.jpg'),
                width: '320w',
            },
            large: {
                img: require('../assets/landscape.jpg'),
                width: '500w',
            },
        },
        default: require('../assets/landscape.jpg'),
    },
    services: {
        webp: {
            small: {
                img: require('../assets/320/services.webp'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/services.webp'),
                width: '320w',
            },
            large: {
                img: require('../assets/services.webp'),
                width: '500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/services.jpg'),
                width: '128w',
            },
            medium: {
                img: require('../assets/768/services.jpg'),
                width: '320w',
            },
            large: {
                img: require('../assets/services.jpg'),
                width: '500w',
            },
        },
        default: require('../assets/services.jpg'),
    },
    skills: {
        webp: {
            small: {
                img: require('../assets/320/skills.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/skills.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/skills.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/skills.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/skills.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/skills.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/skills.jpg'),
    },
    notfound: {
        webp: {
            small: {
                img: require('../assets/320/notfound.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/notfound.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/notfound.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/notfound.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/notfound.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/notfound.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/notfound.jpg'),
    },
    environment: {
        webp: {
            small: {
                img: require('../assets/320/environment.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/environment.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/environment.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/320/environment.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/768/environment.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/environment.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/environment.jpg'),
    },
    infrastructure: {
        webp: {
            small: {
                img: require('../assets/infrastructure.webp'),
                width: '1281w',
            },
            medium: {
                img: require('../assets/infrastructure.webp'),
                width: '1281w',
            },
            large: {
                img: require('../assets/infrastructure.webp'),
                width: '1281w',
            },
        },
        png: {
            small: {
                img: require('../assets/infrastructure.png'),
                width: '1281w',
            },
            medium: {
                img: require('../assets/infrastructure.png'),
                width: '1281w',
            },
            large: {
                img: require('../assets/infrastructure.png'),
                width: '1281w',
            },
        },
        default: require('../assets/infrastructure.png'),
    },
    policy: {
        webp: {
            small: {
                img: require('../assets/policy.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/policy.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/policy.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/policy.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/policy.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/policy.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/policy.jpg'),
    },
    status: {
        webp: {
            small: {
                img: require('../assets/status.webp'),
                width: '320w',
            },
            medium: {
                img: require('../assets/status.webp'),
                width: '768w',
            },
            large: {
                img: require('../assets/status.webp'),
                width: '2500w',
            },
        },
        jpg: {
            small: {
                img: require('../assets/status.jpg'),
                width: '320w',
            },
            medium: {
                img: require('../assets/status.jpg'),
                width: '768w',
            },
            large: {
                img: require('../assets/status.jpg'),
                width: '2500w',
            },
        },
        default: require('../assets/status.jpg'),
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
};
/* eslint-enable global-require */

export default Images;
