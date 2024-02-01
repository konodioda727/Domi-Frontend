import React from "react";
import {Input, InputProps} from "@tarojs/components";
import './input.less'

const InputElem: React.FC<InputProps> = (props) => {
  const {className, placeholderClass, onInput, ...restProps} = props;
  return (
    <>
      <Input onInput={onInput} className={`default-input ${className}`} placeholderClass={`${placeholderClass} default-place-holder`} {...restProps}></Input>
    </>
  )
}

export default InputElem
