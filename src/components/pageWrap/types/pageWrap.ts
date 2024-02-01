import React from "react";
import {ViewProps} from "@tarojs/components";

export interface TopBarProps {
  children?: React.ReactElement | string,
  pos: 'left' | 'center' | 'leftWithButton' | 'centerWithButton',
  navURL?: string
}
export interface PageWrapProps extends ViewProps {
  topBarProps: TopBarProps,
  hasNavbar?: boolean,
}

export interface BackButtonProps {
  naviBackURL?: string,
}
