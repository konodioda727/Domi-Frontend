import PageWrap from "@/components/pageWrap/pageWrap";
import DetailedInfo from "@/components/detailedInfo/detailedInfo";
import React from "react";
import {studentConfig} from "@/configs/detailedInfoConfig";


const PreLog: React.FC = () => {
  const handleSubmit = (inputSet) => {
    console.log(inputSet)
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
