import Login from '@/components/login/login';
import PageWrap from '@/components/pageWrap/pageWrap';
import { stuLoginConfig } from '@/configs/loginConfig';
import React from 'react';

definePageConfig({
  disableScroll: true
})
const StuLogin: React.FC = () => {
  const { loginProps, topBarProps } = stuLoginConfig;
  return (
    <>
      <PageWrap topBarProps={topBarProps}>
        <Login {...loginProps}></Login>

      </PageWrap>
    </>
  );
};

export default StuLogin;
