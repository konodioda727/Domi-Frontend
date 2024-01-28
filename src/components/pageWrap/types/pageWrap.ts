import React from "react";

export interface TopBarProps {
  children?: React.ReactElement | string,
  pos: 'left' | 'center' | 'leftWithButton',
}
export interface PageWrapProps {
  children?:  React.ReactElement,
  topBarProps: TopBarProps,
  hasNavbar?: boolean
}

export interface BackButtonProps {
  naviBackURL: string,
}
