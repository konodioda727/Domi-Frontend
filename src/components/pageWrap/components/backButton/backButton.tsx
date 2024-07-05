import { BackButtonProps } from '@/components/pageWrap/types/pageWrap';
import { useCapsuleInfo } from '@/hooks/useCapsuleInfo';
import { Nav } from '@/utils/nav';
import {Image, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { CSSProperties } from 'react';
import './backButton.less';

const BackButton: React.FC<BackButtonProps> = props => {
  const { naviBackURL } = props;
  const { capsulePos } = useCapsuleInfo();
  const { top, height } = capsulePos;
  const backButtonWrapStyle: CSSProperties = {
    position: 'absolute',
    top: `calc(${ top }px + ${ height / 2 }px - 5vw)`,
    left: '3%',
  }
  const backButtonStyle: CSSProperties = {
    width: `${height / 2 - 5}px`,
    height: `${height / 2}px`,
  };
  const handleClick = () => {
    naviBackURL ? Nav(`/pages/${naviBackURL}`) : Taro.navigateBack();
  };
  return (
    <View style={backButtonWrapStyle} className="back-button-wrap" onClick={handleClick}>
      <Image
        style={backButtonStyle}
        className="back-button-image"
        src="https://s2.loli.net/2024/01/25/ckHYaL1SbNf62QM.png"
      ></Image>
    </View>
  );
};

export default BackButton;
