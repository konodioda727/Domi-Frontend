import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import {DetailedInfoProps, DetailedInfoType} from "@/pages/types/detailedInfo";
import Input from "@/components/input/input";
import {Nav} from "@/utils/nav";
import Taro from "@tarojs/taro";
import React, {useState} from "react";
import {View} from "@tarojs/components";
import './detailedInfo.less'

const DetailedInfo: React.FC<DetailedInfoProps> = (props) => {
  const [inputSet, setInputSet] = useState<{[key: string]: string}>({});
  const {text, inputs, navURL, onSubmit} = props;
  const texts = text.split('\n')
  const handleApply = () => {
    if(Object.keys(inputSet).length === inputs.length) {
      onSubmit && onSubmit(inputSet)
      Nav(navURL)
    } else {
      Taro.showToast({
        title: "字段不能为空",
        icon: 'error',
        duration: 1000
      })
    }
  }
  const handleInput = (e: any, tag: keyof DetailedInfoType) => {
    console.log(e.detail.value)
    setInputSet({...inputSet, [`${tag}`]: e.detail.value})
  }

  return (
    <>
        <ContentFiled className='prelogin-wrap'>

          {texts.map((currentText, index) => {
            return index === 0 ? <View className='prelogin-text-big'>{currentText}</View> : <View className='prelogin-text-small'>{currentText}</View>
          })}

          {inputs.map((item, index) => <Input key={index} className='prelogin-input' placeholder={item.placeHolder} onInput={(e) =>handleInput(e, item.tag)}></Input>)}

          <Button className='prelogin-button' onClick={handleApply}>开始申请</Button>
        </ContentFiled>
    </>
  )
}

export default DetailedInfo
