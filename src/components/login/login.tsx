import React, {useState} from "react";
import {BaseEventOrig, InputProps, View} from "@tarojs/components";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import Input from "@/components/input/input";
import Logo from "@/components/login/components/logo/logo";
import {LoginProps} from "@/components/login/types/loginProps";
import './login.less'


const Login: React.FC<LoginProps> = (props) => {
  const {loginConfigs, logoConfigs, onLogin, onRegister} = props;
  const [paramSet, setParamSet] = useState({});
  const handleInput = (e: BaseEventOrig<InputProps.inputEventDetail>, itemTitle: string) => {
    setParamSet({...paramSet, [itemTitle]: e.detail.value})
  }
  const clear = () => {
    setParamSet({})
  }
  const handleLogin = () => {
    onLogin && onLogin(paramSet, clear)
  }
  const handleRegister = () => {
    onRegister && onRegister(paramSet, clear)
  }
  return (
    <>
      <ContentFiled className='login-wrap'>
        {logoConfigs && <Logo {...logoConfigs}></Logo>}
        {loginConfigs.map((item, key) => {
          return <Input key={key} value={paramSet[item.title]} placeholder={item.displayText} onInput={(e)=>handleInput(e,item.title)} password={item.type.includes('password')} type={item.type || 'text'}></Input>
        })}
        <View className='login-buttons'>
          <Button className={`${onRegister?'login-multi-button':'login-single-button'}`} onClick={handleLogin}>登  录</Button>
          {onRegister && <Button className='login-multi-button' onClick={handleRegister}>注  册</Button> }
        </View>
      </ContentFiled>
    </>
  )
}

export default Login
