import Login from "@/components/login/login";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {stuLoginConfig} from "@/configs/loginConfig";

const StuLogin: React.FC = () => {
  const {loginProps, topBarProps} = stuLoginConfig
  return (
    <>
      <PageWrap topBarProps={topBarProps}>
        <Login {...loginProps}></Login>
      </PageWrap>
    </>
  )
}

export default StuLogin
