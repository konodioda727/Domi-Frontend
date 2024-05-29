import { View, ViewProps } from '@tarojs/components';
import React from 'react';
import './contentField.less';

const ContentFiled: React.FC<ViewProps> = props => {
  const { className, children, ...restProps } = props;
  return (
    <>
      <View className={`${className} content-field`} {...restProps}>
        {children}
      </View>
    </>
  );
};

export default ContentFiled;
