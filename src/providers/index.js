/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Providers exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

export { withConfig, default as ConfigProvider, useConfig } from './Config';
export { withMenu, default as MenuProvider, useMenu } from './Menu';
export { withOnline, default as OnlineProvider, useOnline } from './Online';
export { withTheme, default as AppThemeProvider, useTheme as useAppTheme } from './Theme';
export { withRobot, default as RobotProvider, useRobot } from './Robot';
export { withMat, default as MatProvider, useMat } from './Mat';
