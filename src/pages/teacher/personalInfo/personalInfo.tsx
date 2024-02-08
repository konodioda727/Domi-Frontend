import React from "react";
import PersonalInfo from "@/components/personalInfo/personalInfo";
import PageWrap from "@/components/pageWrap/pageWrap";

const PersonalInfoPage: React.FC = () => {
  return (
    <>
      <PageWrap topBarProps={{pos: 'center'}} hasNavbar>
        <PersonalInfo type='teacher' data={{name: '123', ID:'123', campus:'123', grade:'123'}}></PersonalInfo>
      </PageWrap>
    </>
  )
}

export default PersonalInfoPage
