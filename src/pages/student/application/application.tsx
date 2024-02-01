import React from "react";
import PageWrap from "@/components/pageWrap/pageWrap";
import {Image, View} from "@tarojs/components";
import './application.less'

const Application: React.FC = () => {
  return (
    <>
      <PageWrap className='application-wrap' topBarProps={{pos:'center', children:'CCNU换宿申请'}}>
        <Image className='progress-bar' src='https://i2.100024.xyz/2024/02/01/12wc896.webp'></Image>
        <View className='task-wrap'></View>
      </PageWrap>
    </>
  )
}

export default Application

export const TaskELem: React.FC = () => {
  return (
    <></>
  )
}
