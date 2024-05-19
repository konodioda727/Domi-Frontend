import React, {useMemo} from "react";
import ContentFiled from "@/components/contentField/contentFiled";
import {View} from "@tarojs/components";
import {PersonSwitchCard} from "@/components/personalInfo/components/personalTabbar/personalTabbar";
import {PersonalInfoProps} from "@/components/personalInfo/types/personalInfo";
import {stuPersonalInfoTag, teaPersonalInfoTag} from "@/configs/personalInfoConfig";
import './personalInfo.less'

const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const {data, type} = props;
  const info = useMemo(() => {
    if(data) return data
  }, [data]);
  const infoTagMap = {
    student: stuPersonalInfoTag,
    teacher: teaPersonalInfoTag
  }
  return (
    <ContentFiled className='personal-info-wrap'>
      <View className='personal-info-welcome'>{`你好， ${info?.name}${type === 'student' ? '同学' : '老师'}`}</View>
      <View className='personal-stu-num'>{`${info?.ccnuid}`}</View>
      <View className='personal-grade'>{`${info?.school}学院`}</View>
      <View className='personal-switch-card'>
        {infoTagMap[type].map((tag) => <PersonSwitchCard type={tag} />)}
      </View>
    </ContentFiled>
  )
}

export default PersonalInfo
