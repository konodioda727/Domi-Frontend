import ContentFiled from '@/components/contentField/contentFiled';
import { PersonSwitchCard } from '@/components/personalInfo/components/personalTabbar/personalTabbar';
import { PersonalInfoProps } from '@/components/personalInfo/types/personalInfo';
import {
  stuPersonalInfoTag,
  teaPersonalInfoTag,
} from '@/configs/personalInfoConfig';
import { View, Image } from '@tarojs/components';
import React, { useMemo } from 'react';
import { fetchLogout } from '@/services/fetch';
import Taro from '@tarojs/taro';
import { Redirect } from '@/utils/nav';
import './personalInfo.less';

const PersonalInfo: React.FC<PersonalInfoProps> = props => {
  const { data, type } = props;
  const info = useMemo(() => {
    if (data) return data;
  }, [data]);
  const infoTagMap = {
    student: stuPersonalInfoTag,
    teacher: teaPersonalInfoTag,
  };
  return (
    <ContentFiled className="personal-info-wrap">
      <View className="personal-info-welcome">{`你好， ${info?.name}${
        type === 'student' ? '同学' : '老师'
      }`}</View>
      {info?.student_id && (
        <View className="personal-stu-num">{`${info?.student_id}`}</View>
      )}
      <View className="personal-grade">{`${info?.school}`}</View>
      <View className="personal-switch-card">
        {infoTagMap[type].map(tag => (
          <PersonSwitchCard type={tag} />
        ))}
      </View>
      <Image className='quit' src='https://s2.loli.net/2024/08/18/Y5ZCvMXjTpsQDE6.png' onClick={() => fetchLogout().then(res => {
          if (res && res.data.code === 0) {
            Taro.showToast({
              title: '登出成功',
            }).then(() => {
              Taro.clearStorage();
              Redirect('/pages/index/index');
            });
          }
        })}></Image>
    </ContentFiled>
  );
};

export default PersonalInfo;
