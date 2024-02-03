import React from "react";
import PersonalInfo from "@/components/personalInfo/personalInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import './personalInfo.less'

const PersonalInfoPage: React.FC = () => {
  return (
    <>
      <PageWrap topBarProps={{pos: 'center'}} hasNavbar>
        <PersonalInfo></PersonalInfo>
      </PageWrap>
    </>
  )
}

export default PersonalInfoPage
