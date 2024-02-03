import React from "react";
import ContentFiled from "@/components/contentField/contentFiled";
import {View} from "@tarojs/components";
import {PersonSwitchCard} from "@/components/personalInfo/components/personalTabbar/personalTabbar";
import {stuPersonalInfoTag} from "@/configs/personalInfoConfig";
import './personalInfo.less'

const PersonalInfo: React.FC = () => {
  return (
    <ContentFiled className='personal-info-wrap'>
      <View className='personal-info-welcome'>{`你好， ${123}同学`}</View>
      <View className='personal-stu-num'>{`${2022214772}`}</View>
      <View className='personal-grade'>{`${22335}学院 ${23}级`}</View>
      <View className='personal-switch-card'>
        {stuPersonalInfoTag.map((tag) => <PersonSwitchCard type={tag} />)}
      </View>
    </ContentFiled>
  )
}

export default PersonalInfo
