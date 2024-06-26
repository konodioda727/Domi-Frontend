import {
  PersonaltabProps,
  switchCarType,
} from '@/components/personalInfo/types/personalInfo';
import { personalInfoConfig } from '@/configs/personalInfoConfig';
import { Nav } from '@/utils/nav';
import { Image, View } from '@tarojs/components';
import React from 'react';
import './personalTabbar.less';

export const PersonalTabbar: React.FC<PersonaltabProps> = props => {
  const { icon, text, navURl, onClick } = props;
  const handleClick = () => {
    Nav(navURl || '');
    onClick && onClick(navURl || '');
  };
  return (
    <View className="personal-tabbar" onClick={handleClick}>
      <Image src={icon} className="personal-tab-icon"></Image>
      <View className="personal-text">{text}</View>
    </View>
  );
};

export const PersonSwitchCard: React.FC<{ type: switchCarType }> = props => {
  return (
    <>
      <PersonalTabbar {...personalInfoConfig[props.type]}></PersonalTabbar>
    </>
  );
};
