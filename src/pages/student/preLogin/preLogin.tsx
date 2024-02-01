import React from "react";
import Taro from "@tarojs/taro";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import Input from "@/components/input/input";
import PageWrap from "@/components/pageWrap/pageWrap";
import {View} from "@tarojs/components";
import './prelogin.less'

const PreLogin: React.FC = () => {
  const handleNav = () => {
    Taro.navigateTo({url:'/pages/student/login/login'})
  }
  return (
    <>
      <PageWrap topBarProps={{pos:'centerWithButton', children:'CCNU换宿申请'}}>
        <ContentFiled className='prelogin-wrap'>

          <View className='prelogin-text-big'>同学你好：</View>
          <View className='prelogin-text-small'>本页信息仅用作对应学院辅导员，</View>
          <View className='prelogin-text-small'>即换宿申请的审批人员，请放心填写</View>

          <Input className='prelogin-input' placeholder='姓名'></Input>
          <Input className='prelogin-input' placeholder='学院'></Input>
          <Input className='prelogin-input' placeholder='学号'></Input>

          <Button className='prelogin-button' onClick={handleNav}>开始申请</Button>
        </ContentFiled>
      </PageWrap>
    </>
  )
}

export default PreLogin
