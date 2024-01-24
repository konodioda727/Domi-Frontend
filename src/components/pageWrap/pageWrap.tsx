import TopBar from "@/components/pageWrap/components/topBar/topBar";
import {PageWrapProps} from "@/components/pageWrap/types/pageWrap";
import {View} from "@tarojs/components";
import React from "react";
import './pageWrap.less'


const PageWrap:React.FC<PageWrapProps> = (props)=> {
  const {topBarProps} = props
  return (
    <>
      <TopBar {...topBarProps}>{topBarProps?.children}</TopBar>
      <View className='page-wrap-default'>
          {props.children}
      </View>
    </>
  )
}
export default PageWrap
