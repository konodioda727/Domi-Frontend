import React from "react";
import Navbar from "@/components/pageWrap/components/navbar/navbar";
import {PageWrapProps} from "@/components/pageWrap/types/pageWrap";
import TopBar from "@/components/pageWrap/components/topBar/topBar";
import {View} from "@tarojs/components";
import './pageWrap.less'

const PageWrap:React.FC<PageWrapProps> = (props)=> {
  const {topBarProps, hasNavbar,children,className, ...restProps} = props
  return (
    <>
      <TopBar {...topBarProps}>{topBarProps?.children}</TopBar>
      <View className={`page-wrap-default ${className}`} {...restProps}>
          {children}
      </View>
      {hasNavbar && <Navbar></Navbar>}
    </>
  )
}
export default PageWrap
