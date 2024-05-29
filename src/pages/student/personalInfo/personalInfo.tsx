import PageWrap from '@/components/pageWrap/pageWrap';
import PersonalInfo from '@/components/personalInfo/personalInfo';
import { fetchGetMyInfo } from '@/services/fetch';
import { PersonalInfoResponseType } from '@/services/fetchTypes';
import React, { useEffect, useState } from 'react';
import './personalInfo.less';

const PersonalInfoPage: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoResponseType>();
  useEffect(() => {
    fetchGetMyInfo().then(res => {
      if (res) {
        setPersonalInfo(res.data.data);
      }
    });
  }, []);
  return (
    <>
      <PageWrap topBarProps={{ pos: 'center' }} hasNavbar>
        <PersonalInfo type="student" data={personalInfo}></PersonalInfo>
      </PageWrap>
    </>
  );
};

export default PersonalInfoPage;
