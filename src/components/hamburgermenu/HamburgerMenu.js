/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Hamburger menu container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { MenuList, MenuItem, ListItemText, ListItemIcon, Link, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled as styledReact } from '@mui/system';

/* Other external includes */
import styled from 'styled-components';

/* Website includes */
import { useMenu, useConfig } from '../../providers';
import logMessage from '../../utils/logging';

const HamburgerMenuFrame = styled.div`
    width: ${(props) => props.width};
    text-align:right;
    top:${(props) => props.top};
    left:${(props) => props.left};
    background-color: ${(props) => props.color};
    z-index: 1000;
    font-size: 10px;
    position: fixed;
`;

const HamburgerMenuItem = styledReact(MenuItem)(({ padding, height, color }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '30px',
    fontSize: '14px',
    textDecoration: 'none',
    textDecorationColor: 'black',
    a: { textDecoration: 'none' },
    '&:hover': {
        borderTopStyle: 'none',
        borderLeftStyle: 'solid',
        borderBottomStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        borderColor: color,
        transition: 'border-bottom-style 2s',
    },
}));

const HamburgerMenuSubItem = styledReact(MenuItem)(({ padding, height, color }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '0px',
    fontSize: '14px',
    textDecoration: 'none',
    textDecorationColor: 'black',
    a: { textDecoration: 'none' },
    '&:hover': {
        borderTopStyle: 'none',
        borderLeftStyle: 'solid',
        borderBottomStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        borderColor: color,
        transition: 'border-bottom-style 2s',
    },
}));

const HamburgerMenuList = styledReact(MenuList)(({ padding }) => ({
    paddingTop: padding,
    paddingBottom: padding,
}));

const HamburgerListItemText = styledReact(ListItemText)(({ color }) => ({
    textDecoration: 'none',
    textTransform: 'uppercase',
    color,
    textDecorationColor: 'black',
    span: {
        color,
        fontSize: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textDecorationColor: 'black',
    },
}));

const HamburgerListSubItemText = styledReact(ListItemText)(({ color }) => ({
    textDecoration: 'none',
    textTransform: 'uppercase',
    color,
    paddingLeft: '30px',
    textDecorationColor: 'black',
    span: {
        color,
        fontSize: '12px',
        paddingLeft: '30px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textDecorationColor: 'black',
    },
}));

const HamburgerListItemIcon = styledReact(ListItemIcon)(({ color }) => ({ color }));

function HamburgerMenu() {

    /* --------- Gather inputs --------- */
    const { appConfig } = useConfig();
    const { toggleItem, content, icons, isSliding } = useMenu();
    const { menu } = appConfig || {};
    const { height = '115px', hamburgerHeight = '20px' } = menu || {};
    const theme = useTheme();
    const componentName = 'HamburgerMenu';

    /* --------- Derive sizes ---------- */
    const menuWidthString = `calc( 100vw )`;

    /* ------ Manage button click ------ */
    /* eslint-disable padded-blocks */
    const handleButtonClick = (event) => {

        logMessage(componentName, 'handleButtonClick --- BEGIN');
        toggleItem(event.currentTarget.name, true);
        logMessage(componentName, 'handleButtonClick --- END');

    };
    /* eslint-enable padded-blocks */

    /* -------- Defining theme --------- */
    let txtcolor = theme.palette.primary.main;
    if (isSliding) { txtcolor = theme.palette.common.white; }

    let menucolor = theme.palette.common.white;
    if (isSliding) { menucolor = theme.palette.primary.main; }

    /* ----------- Define HTML --------- */
    return (
        <HamburgerMenuFrame top={height} left={0} width={menuWidthString} color={menucolor}>
            <HamburgerMenuList padding="0px">
                {content.map((item) => {

                    const IconName = icons[item.id];
                    return (
                        <div key={item.id}>
                            {('subitems' in item) && (
                                <HamburgerMenuItem divider={false} padding="0px" height={hamburgerHeight} color={txtcolor}>
                                    <HamburgerListItemIcon color={txtcolor}>
                                        <IconName />
                                    </HamburgerListItemIcon>
                                    <HamburgerListItemText color={txtcolor}>
                                        {item.id}
                                    </HamburgerListItemText>
                                </HamburgerMenuItem>
                            )}
                            {('subitems' in item) && item.subitems.map((subitem) => {

                                return (
                                    <Link key={subitem.id} underline="none" href={subitem.path} target={subitem.target} name={subitem.id}>
                                        <HamburgerMenuSubItem divider={false} padding="0px" height={hamburgerHeight} color={txtcolor}>
                                            <HamburgerListSubItemText color={txtcolor}>
                                                {subitem.id}
                                            </HamburgerListSubItemText>
                                        </HamburgerMenuSubItem>
                                    </Link>
                                )

                            })}
                            {('subitems' in item) && <Divider light />}
                            {!('subitems' in item) && (
                                <Link key={item.id} underline="none" href={item.path} target={item.target} onClick={handleButtonClick} name={item.id}>
                                    <HamburgerMenuItem divider={true} key={item.id} padding="0px" height={hamburgerHeight} color={txtcolor}>
                                        <HamburgerListItemIcon color={txtcolor}>
                                            <IconName />
                                        </HamburgerListItemIcon>
                                        <HamburgerListItemText color={txtcolor}>
                                            {item.id}
                                        </HamburgerListItemText>
                                    </HamburgerMenuItem>
                                </Link>
                            )}
                        </div>
                    );

                })}
            </HamburgerMenuList>
        </HamburgerMenuFrame>
    );

}

export default HamburgerMenu;
