import PageWrap from '@/components/pageWrap/pageWrap';
import {ScrollView,Image, View } from '@tarojs/components';
import React from 'react';
import './index.less';
import {changingImgs} from "@/configs/changingStepsConfig";

definePageConfig({
  disableScroll: true
})
const ChangingSteps: React.FC = () => {
  return (
    <PageWrap topBarProps={{ pos: 'leftWithButton', children: '换宿流程说明' }}>
      <ScrollView scrollY className='changingBox'>
        <View className='change_top'>换宿流程图</View>
        <View className='change_top'>（左侧流程可在小程序中完成）</View>
        <Image mode='widthFix' src={'https://s2.loli.net/2024/08/15/SBIwCXavLRQdZVn.png'}  className='change_img'></Image>
        <View className='change_center'>宿舍服务中心地址：东区学生宿舍14栋1楼</View>
        <View className='change_center'>具体楼栋联系方式：</View>
        {
          changingImgs.map((item,index)=>{
            return(
              <Image mode='widthFix' src={item} key={index*Math.random()} className='change_img'></Image>
            )
          })
        }
      </ScrollView>
    </PageWrap>
  );
};
export default ChangingSteps;
