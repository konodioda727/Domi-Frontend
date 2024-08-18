import DetailedInfo from '@/components/detailedInfo/detailedInfo';
import PageWrap from '@/components/pageWrap/pageWrap';
import { teacherConfig } from '@/configs/detailedInfoConfig';
import { fetchGetMyInfo } from '@/services/fetch';
import { PersonalInfoResponseType } from '@/services/fetchTypes';
import React, { useEffect, useState } from 'react';

definePageConfig({
  disableScroll: true
})
const DetailedInfoPage: React.FC = () => {
    const [currenInfo, setCurrentInfo] = useState<PersonalInfoResponseType>()
    useEffect(() => {
        fetchGetMyInfo().then((res) => {
            if(res && !res.data.code) setCurrentInfo(res.data.data)
        })
    }, [])
  return (
    <>
      <PageWrap
        topBarProps={{ pos: 'centerWithButton', children: 'CCNU换宿申请' }}
      >
        <DetailedInfo {...teacherConfig} data={{'currentAcc': currenInfo?.id}} text={`${currenInfo?.name}老师您好\n为了保障您的账户安全，请您在首次登陆使修改账号及密码`}></DetailedInfo>
      </PageWrap>
    </>
  );
};

export default DetailedInfoPage;
