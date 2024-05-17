import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import {DetailedInfoProps, DetailedInfoType} from "@/pages/types/detailedInfo";
import Input from "@/components/input/input";
import {Nav} from "@/utils/nav";
import Taro from "@tarojs/taro";
import React, {useMemo, useState} from "react";
import {View} from "@tarojs/components";
import './detailedInfo.less'

const DetailedInfo: React.FC<DetailedInfoProps> = (props) => {
  const [inputSet, setInputSet] = useState<{[key: string]: string}>({});
  const {text, inputs, formatTest, navURL, onSubmit} = props;
  const texts = text.split('\n')
  const errorSet = useMemo(() => {
    return formatTest
      ? formatTest.filter((item) => inputSet[item.name] && !item.format.test(inputSet[item.name]))
      : []
  }, [formatTest, inputSet]);
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
    setInputSet({...inputSet, [`${tag}`]: e.detail.value})
  }

  return (
    <>
        <ContentFiled className='prelogin-wrap'>

          {texts.map((currentText, index) => {
            return index === 0 ? <View className='prelogin-text-big'>{currentText}</View> : <View className='prelogin-text-small'>{currentText}</View>
          })}

          {inputs.map((item, index) => {
            const isError = errorSet.find((errItem) => errItem.name === item.tag)
              return (
                <>
                  <Input
                    key={index}
                    className={`prelogin-input ${isError ? 'error-input' : ''}`}
                    placeholder={item.placeHolder}
                    onInput={(e) =>handleInput(e, item.tag)}
                  ></Input>
                  {isError && <View className='error-info'>{item.placeHolder}格式错误</View>}
                </>
              )
          })}

          <Button className='prelogin-button' onClick={handleApply}>开始申请</Button>
        </ContentFiled>
    </>
  )
}

export default DetailedInfo
