import ContentFiled from '@/components/contentField/contentFiled';
import {
  ifInfoEditNavPath,
  ifLoginNavPath,
  indexConfig, logoImg,
} from '@/configs/indexConfig';
import { IdentityMap } from '@/pages/index/indexProps';
import { fetchGetMyInfo } from '@/services/fetch';
import { Nav, Redirect } from '@/utils/nav';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect } from 'react';
import PageWrap from '../../components/pageWrap/pageWrap';
import './index.less';
import {imgMap, progressBarImg} from "@/configs/applicationConfig";
import {changingImgs} from "@/configs/changingStepsConfig";
import {personalimgList} from "@/configs/personalInfoConfig";
import {viewPasswordIcon} from "@/configs/loginConfig";
import { useRoot } from '@/hooks/useGetRoot';
import { teacherNavUrl } from '@/configs/detailedInfoConfig';

definePageConfig({
  disableScroll: true
})
export default function Index() {
  // 找到根节点，实现动态挂载
  useRoot()
  useEffect(() => {
    const data = []
    const pushData = (src: string) => {
      // @ts-ignore
      data.push({type: 'image', src: src})
    }
    const pushDatas = (srcs: string[]) => srcs.forEach(pushData)
    pushDatas(
      [progressBarImg,logoImg]
        .concat([imgMap.fail, imgMap.success])
        .concat(Object.values(personalimgList))
        .concat(Object.values(viewPasswordIcon))
        .concat(Object.values(changingImgs))
    )
  Taro.preloadAssets({
      data: data,
      success(resp) {
        console.log('preloadAssets success', resp)
      },
      fail(err) {
        console.log('preloadAssets fail', err)
      },
    })
    if (Taro.getStorageSync('token')) {
      fetchGetMyInfo()
        .then(res => {
          const role = res && res.data.data.role;
          if (res && res.data.code === 0) {
            if(role !== 'RoleStudent') {
              !res.data.data.pwd_edited 
                ? Nav('/pages/teacher/changePassword/index') 
                : Redirect(ifLoginNavPath[role])
              return;
            }
            res.data.code === 0
              ? Redirect(ifLoginNavPath[role]) 
              : Redirect(ifInfoEditNavPath[role]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  return (
    <PageWrap topBarProps={{ pos: 'center', children: 'CCNU换宿申请' }}>
      <ContentFiled className="index-wrap">
        <View className="header">请选择您的身份:</View>
        {indexConfig.map(item => {
          if (item.text.length > 6)
            return <IndexItem textStyle={{ fontSize: '2vh' }} {...item} />;
          return <IndexItem {...item} />;
        })}
      </ContentFiled>
    </PageWrap>
  );
}

export const IndexItem: React.FC<IdentityMap> = props => {
  const { text, imgURL, textStyle, navURL } = props;
  const handleNav = () => {
    Nav(`/pages/${navURL}`);
  };
  return (
    <View className="index-item">
      <View className="index-item-text" onClick={handleNav} style={textStyle}>
        {text}
      </View>
      <Image className="index-item-img" src={imgURL}></Image>
    </View>
  );
};
