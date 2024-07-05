import {Image, Input, InputProps, Picker, View} from '@tarojs/components';
import React, {useRef, useState} from 'react';
import './input.less';
import {viewPasswordIcon} from "@/configs/loginConfig";

const InputElem: React.FC<InputProps> = props => {
  const { className, placeholderClass, password, onInput, ...restProps } = props;
  const [pass, setPass] = useState<boolean>(password || false)
  const inputRef = useRef<HTMLInputElement>(null)
  console.log('rerender')
  const handleShowPass = (e: any) => {
    e.stopPropagation()
    setPass(!pass)
    inputRef && inputRef.current?.blur()
  }
  // const handleBlur = () => {
  //   inputRef && inputRef.current?.blur()
  // }
  return (
    <View style={{position: "relative", width: '100%', height: '7vh'}} className={'default-input-wrap'}>
      <Input
        ref={inputRef}
        onInput={onInput}
        password={pass}
        className={`default-input ${className}`}
        {...restProps}
      ></Input>
     {password &&
        <View className='show-password-wrap'>
          <Image className='show-password' onClick={handleShowPass}  src={viewPasswordIcon[pass ? 'invisible' : 'visible']}></Image>
        </View>}
    </View>
  );
};

export default InputElem;
interface PickerItemProps {
  defaultValue?: number;
  classNames?: string;
  range: string[];
  handleSelect: (...args: any[]) => void;
  selected: string;
  disable?: boolean;
}
export const PickerItem: React.FC<PickerItemProps> = props => {
  const { defaultValue, classNames, disable, selected, range, handleSelect } = props;
  return (
    <>
      <Picker
        mode="selector"
        style={{ position: 'relative' }}
        defaultValue={defaultValue}
        range={range}
        disabled={disable}
        onChange={handleSelect}
      >
        <View className={classNames + ` approvalForm-item-Input ${disable && 'input-disable'}`}>{selected}</View>
        <Image
          src="https://s2.loli.net/2024/05/26/W1Dysm24pZgbS9O.png"
          className="picker-icon"
        ></Image>
      </Picker>
    </>
  );
};
