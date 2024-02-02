import React from "react";
import {useDebounce} from "@/hooks/useDebounce";
import Taro from "@tarojs/taro";
import {View, ViewProps} from "@tarojs/components";
import './button.less'

interface ButtonProps extends ViewProps{
  disabled?: boolean,
  disabledPrompt?: string
}
const Button: React.FC<ButtonProps> = (props) => {
  const {className, disabledPrompt, children, disabled,onClick, ...restProps} = props;
  const clickEve = (e) => {
    disabled
      ? Taro.showToast({title: disabledPrompt ? disabledPrompt : '按钮禁用', icon: 'error'})
      : onClick && onClick(e)
  }
  const handleClick = useDebounce(clickEve, 100)

  return (
    <View className={`default-button ${className} button-${disabled?'disabled':''}`} onClick={handleClick} {...restProps}>
      {children}
    </View>
  )
}

export default Button
