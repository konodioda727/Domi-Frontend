import React, {useEffect, useState} from "react";
import PersonalInfo from "@/components/personalInfo/personalInfo";
import PageWrap from "@/components/pageWrap/pageWrap";
import {PersonalInfoResponseType} from "@/services/fetchTypes";
import {fetchGetMyInfo} from "@/services/fetch";

const PersonalInfoPage: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoResponseType>()
  useEffect(() => {
    fetchGetMyInfo().then((res) => {
      if(res) {
        setPersonalInfo(res.data.data)
      }
    })
  }, []);
  return (
    <>
      <PageWrap topBarProps={{pos: 'center'}} hasNavbar>
        <PersonalInfo type='teacher' data={personalInfo}></PersonalInfo>
      </PageWrap>
    </>
  )
}

export default PersonalInfoPage
