/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Provider sharing states across components
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

export { withConfig, default as ConfigProvider, useConfig } from './Config';
export { withMenu, default as MenuProvider, useMenu } from './Menu';
export { withOnline, default as OnlineProvider, useOnline } from './Online';
export { withTheme, default as AppThemeProvider, useTheme as useAppTheme } from './Theme';
export { withRobot, default as RobotProvider, useRobot } from './Robot';
export { withCode, default as CodeProvider, useCode } from './Code';
export { withScenario, default as ScenarioProvider, useScenario } from './Scenario';
/* export { mockWithScenario as withScenario, MockProvider as ScenarioProvider, mockUseScenario as useScenario  } from './Scenario/Mock.js'; */
