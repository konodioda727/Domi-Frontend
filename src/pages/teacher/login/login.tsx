import Login from '@/components/login/login';
import PageWrap from '@/components/pageWrap/pageWrap';
import { teaLoginConfig } from '@/configs/loginConfig';
import React from 'react';

definePageConfig({
  disableScroll: true
})
const TeaLoginPage: React.FC = () => {
  const { topBarProps, loginProps } = teaLoginConfig;
  return (
    <>
      <PageWrap topBarProps={topBarProps}>
        <Login {...loginProps}></Login>
      </PageWrap>
    </>
  );
};
export default TeaLoginPage;
