import DetailedInfo from "@/components/detailedInfo/detailedInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {studentConfig} from "@/configs/detailedInfoConfig";
import Taro from "@tarojs/taro";
import {DetailedInfoType} from "@/pages/types/detailedInfo";


const PreLog: React.FC = () => {
  const handleSubmit = (inputSet:{[key: string]: string}) => {
    const form: Partial<DetailedInfoType> = JSON.parse(Taro.getStorageSync('form') || '{}')
    Taro.setStorageSync('form',{...form, ...inputSet})
  }
  return (
    <>
      <PageWrap topBarProps={{pos:'centerWithButton', children:'CCNU换宿申请'}}>
        <DetailedInfo {...studentConfig} onSubmit={handleSubmit}></DetailedInfo>
      </PageWrap>
    </>
  )
}

export default PreLog
