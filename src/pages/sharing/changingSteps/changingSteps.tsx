import PageWrap from '@/components/pageWrap/pageWrap';
import { Image } from '@tarojs/components';
import React from 'react';
import './index.less';
import {changingImg} from "@/configs/changingStepsConfig";

definePageConfig({
  disableScroll: true
})
const ChangingSteps: React.FC = () => {
  return (
    <PageWrap topBarProps={{ pos: 'leftWithButton', children: '换宿流程说明' }}>
      <Image
        className="changingstep_img"
        src={changingImg}
      ></Image>
    </PageWrap>
  );
};
export default ChangingSteps;
