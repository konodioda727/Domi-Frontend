import React from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {View, ViewProps} from "@tarojs/components";
import './button.less'

const Button: React.FC<ViewProps> = (props) => {
  const {className, children, onClick, ...restProps} = props;
  const handleClick = useDebounce((e) => onClick && onClick(e), 100)
  return (
    <View className={`default-button ${className}`} onClick={handleClick} {...restProps}>
      {children}
    </View>
  )
}

export default Button
