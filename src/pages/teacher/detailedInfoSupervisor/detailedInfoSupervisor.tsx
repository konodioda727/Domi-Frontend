import DetailedInfo from "@/components/detailedInfo/detailedInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {supervisorConfig} from "@/configs/detailedInfoConfig";


const PreLog: React.FC = () => {
  const handleSubmit = (inputSet) => {
    console.log(inputSet)
  }
  return (
    <>
      <PageWrap topBarProps={{pos:'centerWithButton', children:'CCNU换宿申请'}}>
        <DetailedInfo {...supervisorConfig} onSubmit={handleSubmit}></DetailedInfo>
      </PageWrap>
    </>
  )
}

export default PreLog
