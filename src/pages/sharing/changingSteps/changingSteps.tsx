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
        <View>换宿流程图</View>
        <View>（左侧流程可在小程序中完成）</View>
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
