import { LogoProps } from '@/components/login/types/loginProps';
import { Image, View } from '@tarojs/components';
import React from 'react';
import './logo.less';

const Logo: React.FC<LogoProps> = props => {
  const { className, size, ...restProps } = props;
  return (
    <View className="logo-wrapper">
      <Image
        className={`logo-${size || 'medium'} ${className}`}
        {...restProps}
        src="https://s2.loli.net/2024/02/01/fQ63XrkUqLYO2aC.png"
      />
    </View>
  );
};

export default Logo;
