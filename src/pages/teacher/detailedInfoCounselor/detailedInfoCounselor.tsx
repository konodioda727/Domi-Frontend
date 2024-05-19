import DetailedInfo from "@/components/detailedInfo/detailedInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {counselorConfig} from "@/configs/detailedInfoConfig";


const PreLog: React.FC = () => {
  return (
    <>
      <PageWrap topBarProps={{pos:'centerWithButton', children:'CCNU换宿申请'}}>
        <DetailedInfo {...counselorConfig}></DetailedInfo>
      </PageWrap>
    </>
  )
}

export default PreLog
