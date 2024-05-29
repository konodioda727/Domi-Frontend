import ContentFiled from '@/components/contentField/contentFiled';
import { PersonSwitchCard } from '@/components/personalInfo/components/personalTabbar/personalTabbar';
import { PersonalInfoProps } from '@/components/personalInfo/types/personalInfo';
import {
  stuPersonalInfoTag,
  teaPersonalInfoTag,
} from '@/configs/personalInfoConfig';
import { View } from '@tarojs/components';
import React, { useMemo } from 'react';
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
    </ContentFiled>
  );
};

export default PersonalInfo;
