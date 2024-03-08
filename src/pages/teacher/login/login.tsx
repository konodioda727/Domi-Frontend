import Login from "@/components/login/login";
import PageWrap from "@/components/pageWrap/pageWrap";
import React from "react";
import {teaLoginConfig} from "@/configs/loginConfig";

const TeaLoginPage: React.FC = () => {
  const {topBarProps, loginProps} = teaLoginConfig
  return (
    <>
      <PageWrap topBarProps={topBarProps}>
        <Login {...loginProps}></Login>
      </PageWrap>
    </>
  )
}
export default TeaLoginPage
