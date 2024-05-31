import { LogoProps } from '@/components/login/types/loginProps';
import { Image, View } from '@tarojs/components';
import React from 'react';
import './logo.less';
import {logoImg} from "@/configs/indexConfig";

const Logo: React.FC<LogoProps> = props => {
  const { className, size, ...restProps } = props;
  return (
    <View className="logo-wrapper">
      <Image
        className={`logo-${size || 'medium'} ${className}`}
        {...restProps}
        src={logoImg}
      />
    </View>
  );
};

export default Logo;
