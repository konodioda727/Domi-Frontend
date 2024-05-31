import { BackButtonProps } from '@/components/pageWrap/types/pageWrap';
import { useCapsuleInfo } from '@/hooks/useCapsuleInfo';
import { Nav } from '@/utils/nav';
import { Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { CSSProperties } from 'react';
import './backButton.less';

const BackButton: React.FC<BackButtonProps> = props => {
  const { naviBackURL } = props;
  const { capsulePos } = useCapsuleInfo();
  const { top, height } = capsulePos;
  const backButtonStyle: CSSProperties = {
    position: 'absolute',
    top: `${top + height / 4}px`,
    width: `${height / 2 - 5}px`,
    height: `${height / 2}px`,
    left: '6%',
  };
  const handleClick = () => {
    naviBackURL ? Nav(`/pages/${naviBackURL}`) : Taro.navigateBack();
  };
  return (
    <>
      <Image
        style={backButtonStyle}
        className="back-button-image"
        src="https://s2.loli.net/2024/01/25/ckHYaL1SbNf62QM.png"
        onClick={handleClick}
      ></Image>
    </>
  );
};

export default BackButton;
