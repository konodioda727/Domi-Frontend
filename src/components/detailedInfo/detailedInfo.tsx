import Button from '@/components/button/button';
import ContentFiled from '@/components/contentField/contentFiled';
import Input, { PickerItem } from '@/components/input/input';
import {
  DetailedInfoProps,
} from '@/pages/types/detailedInfo';
import { fetchGetMyInfo } from '@/services/fetch';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useMemo, useState } from 'react';
import './detailedInfo.less';
import Modal from '../modal';

const DetailedInfo: React.FC<DetailedInfoProps> = props => {
  const [inputSet, setInputSet] = useState<{ [key: string]: string }>({});
  const { text, inputs, formatTest, onSubmit, data: dataset } = props;
  const [shouldUpload, setShouldUpload] = useState<boolean | null>(null)
  const texts = text.split('\n');
  const errorSet = useMemo(() => {
    return formatTest
      ? formatTest.filter(
          item =>
            inputSet[item.name] &&
            !item.format.every(rule => rule.test(inputSet[item.name]))
        )
      : [];
  }, [formatTest, inputSet]);
  useEffect(() => {
    fetchGetMyInfo().then(res => {
      res &&
        Taro.setStorageSync('form_info', {
          ...res.data.data,
          ...Taro.getStorageSync('form_info'),
        });
      res && setInputSet(res.data.data);
    });
  }, []);
  const handleApply = () => {
    if (Object.keys(inputSet).length >= inputs.length && shouldUpload !== false) {
      Taro.showModal({
        title: '注意',
        content: '请确保所填信息真实性，提交后不可更改',
        success: () => {
          onSubmit && onSubmit(inputSet);
        }
      })
    } else {
      Taro.showToast({
        title: '字段不能为空',
        icon: 'error',
        duration: 1000,
      });
    }
  };
  const handleInput = (e: any, item: DetailedInfoProps['inputs'][0]) => {
    const {tag, confirm} = item
    if(!confirm) setInputSet({ ...inputSet, [`${tag}`]: e.detail.value });
    if(!!confirm && inputSet[confirm] !== e.detail.value) setShouldUpload(false) 
    if(!!confirm && inputSet[confirm] === e.detail.value) setShouldUpload(true)
  };
  const handleSelect = (e: any, item) => {
    console.log(e.target.value);
    if(e.target.value != 0) setInputSet({ ...inputSet, [item.tag]: item.range![e.target.value] });
    else 
    Modal.show({ content: '选项不能为空', showCancel: false });
  };

  return (
    <>
      <ContentFiled className="prelogin-wrap">
        {texts.map((currentText, index) => {
          return index === 0 ? (
            <View className="prelogin-text-big">{currentText}</View>
          ) : (
            <View className="prelogin-text-small">{currentText}</View>
          );
        })}

        {inputs.map((item, index) => {
          const isError = errorSet.find(errItem => errItem.name === item.tag);
          return (
            <>
              <View className='prelogin-input-section'>
                <View className='prelogin-input_title'>{item.placeHolder}:</View>
                {item.type === 'picker' ? (
                  <PickerItem
                    defaultValue={item.range!.indexOf(item.placeHolder) || 0}
                    selected={inputSet[item.tag] || item.placeHolder}
                    handleSelect={e => handleSelect(e, item)}
                    range={item.range!}
                  disable={item.disabled ?? false}
                    classNames={`prelogin-${item.size ?? 'md'} "prelogin-picker"`}
                  ></PickerItem>
                ) : 
                  <Input
                    key={index}
                    className={`prelogin-input ${isError ? 'error-input' : ''} prelogin-${item.size ?? 'md'}`}
                    placeholder={item.data ? dataset![item.data] : ''}
                    disabled={item.disabled ?? false}
                    onInput={e => handleInput(e, item)}
                  ></Input>
                }
              </View>
              {!shouldUpload && item.confirm ?  <View className="error-info">{item.placeHolder}格式错误</View> : null}
            </>
          );
        })}

        <Button className="prelogin-button" onClick={handleApply}>
          我已确认
        </Button>
      </ContentFiled>
    </>
  );
};

export default DetailedInfo;
