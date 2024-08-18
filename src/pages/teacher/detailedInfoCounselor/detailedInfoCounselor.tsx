import DetailedInfo from '@/components/detailedInfo/detailedInfo';
import PageWrap from '@/components/pageWrap/pageWrap';
import { counselorConfig } from '@/configs/detailedInfoConfig';
import React from 'react';

definePageConfig({
  disableScroll: true
})
/** 
 * @deprecated 旧需求，不再使用，目前更新为均价changePassword
 */
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
