import DetailedInfo from "@/components/detailedInfo/detailedInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {studentConfig} from "@/configs/detailedInfoConfig";


const DetailedInfoPage: React.FC = () => {
  return (
    <>
      <PageWrap topBarProps={{pos:'centerWithButton', children:'CCNU换宿申请'}}>
        <DetailedInfo {...studentConfig} ></DetailedInfo>
      </PageWrap>
    </>
  )
}

export default DetailedInfoPage
