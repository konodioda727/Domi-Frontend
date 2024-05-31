import DetailedInfo from '@/components/detailedInfo/detailedInfo';
import PageWrap from '@/components/pageWrap/pageWrap';
import { supervisorConfig } from '@/configs/detailedInfoConfig';
import React from 'react';

definePageConfig({
  disableScroll: true
})
const PreLog: React.FC = () => {
  return (
    <>
      <PageWrap
        topBarProps={{ pos: 'centerWithButton', children: 'CCNU换宿申请' }}
      >
        <DetailedInfo {...supervisorConfig}></DetailedInfo>
      </PageWrap>
    </>
  );
};

export default PreLog;
