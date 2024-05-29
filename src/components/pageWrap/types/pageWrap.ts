import { ViewProps } from '@tarojs/components';
import React from 'react';

export interface TopBarProps {
  children?: React.ReactElement | string;
  pos: 'left' | 'center' | 'leftWithButton' | 'centerWithButton';
  navURL?: string;
}
export interface PageWrapProps extends ViewProps {
  topBarProps: TopBarProps;
  hasNavbar?: boolean;
}

export interface BackButtonProps {
  naviBackURL?: string;
}
