import BackButton from "@/components/pageWrap/components/backButton/backButton";
import {TopBarProps} from "@/components/pageWrap/types/pageWrap";
import {useGenerateBarCSS, useGenerateTextCSS} from "@/hooks/useTopBarCSS";
import React from "react";
import {View} from "@tarojs/components";
import './topBar.less'



const TopBar: React.FC<TopBarProps> = (props) => {
  const {pos, navURL, children} = props
  return (
    <>
      <View className='topbar' style={useGenerateBarCSS()}>
        {pos.includes('WithButton') && <BackButton naviBackURL={navURL} />}
        <View className='topbar-text' style={useGenerateTextCSS(props)}>{children}</View>
      </View>
    </>
  )
}

export default TopBar
