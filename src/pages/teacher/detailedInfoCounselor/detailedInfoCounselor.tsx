import DetailedInfo from '@/components/detailedInfo/detailedInfo';
import PageWrap from '@/components/pageWrap/pageWrap';
import { counselorConfig } from '@/configs/detailedInfoConfig';
import React from 'react';

const PreLog: React.FC = () => {
  return (
    <>
      <PageWrap
        topBarProps={{ pos: 'centerWithButton', children: 'CCNU换宿申请' }}
      >
        <DetailedInfo {...counselorConfig}></DetailedInfo>
      </PageWrap>
    </>
  );
};

export default PreLog;
