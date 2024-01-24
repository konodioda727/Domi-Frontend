import BackButton from "@/components/pageWrap/components/backButton/backButton";
import {TopBarProps} from "@/components/pageWrap/types/pageWrap";
import {useGenerateBarCSS, useGenerateTextCSS} from "@/hooks/useTopBarCSS";
import React from "react";
import {View} from "@tarojs/components";
import './topBar.less'



const TopBar: React.FC<TopBarProps> = (props) => {
  return (
    <>
      <View className='topbar' style={useGenerateBarCSS()}>
        {props.pos === 'leftWithButton' && <BackButton naviBackURL='/index' />}
        <View className='topbar-text' style={useGenerateTextCSS(props)}>{props.children}</View>
      </View>
    </>
  )
}

export default TopBar
