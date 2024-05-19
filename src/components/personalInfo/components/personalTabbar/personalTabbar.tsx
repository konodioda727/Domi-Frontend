import React from "react";
import {Image, View} from "@tarojs/components";
import {personalInfoConfig} from "@/configs/personalInfoConfig";
import {PersonaltabProps, switchCarType} from "@/components/personalInfo/types/personalInfo";
import {Nav} from "@/utils/nav";
import './personalTabbar.less'


export const PersonalTabbar: React.FC<PersonaltabProps> = (props) => {
  const {icon, text, navURl, onClick} = props;
  const handleClick = () => {
    Nav(navURl || '')
    onClick && onClick(navURl || '')
  }
  return (
    <View className='personal-tabbar' onClick={handleClick}>
      <Image src={icon} className='personal-tab-icon'></Image>
      <View className='personal-text'>{text}</View>
    </View>
  )
}

export const PersonSwitchCard: React.FC<{type: switchCarType}> = (props) => {
  return (
    <>
      <PersonalTabbar {...personalInfoConfig[props.type]}></PersonalTabbar>
    </>
  )
}
