import { Image, Input, InputProps, Picker, View } from '@tarojs/components';
import React from 'react';
import './input.less';

const InputElem: React.FC<InputProps> = props => {
  const { className, placeholderClass, onInput, ...restProps } = props;
  return (
    <>
      <Input
        onInput={onInput}
        className={`default-input ${className}`}
        placeholderClass={`${placeholderClass} default-place-holder`}
        {...restProps}
      ></Input>
    </>
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
