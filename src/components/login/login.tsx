import React, {useMemo, useState} from "react";
import {BaseEventOrig, InputProps, View} from "@tarojs/components";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import Input from "@/components/input/input";
import Logo from "@/components/login/components/logo/logo";
import {LoginProps} from "@/components/login/types/loginProps";
import Taro from "@tarojs/taro";
import './login.less'


const Login: React.FC<LoginProps> = (props) => {
  const {loginConfigs, logoConfigs, formatTest, onLogin, onRegister} = props;
  const [paramSet, setParamSet] = useState({});
  const errorSet = useMemo(() => {
    return formatTest
      ? formatTest.filter((item) => !paramSet[item.name] || !item.format.test(paramSet[item.name]))
      : []
  }, [formatTest, paramSet]);
  const handleInput = (e: BaseEventOrig<InputProps.inputEventDetail>, itemTitle: string) => {
    setParamSet({...paramSet, [itemTitle]: e.detail.value})
  }
  const clear = () => {
    setParamSet({})
  }
  const handleLogin = () => {
    console.log(errorSet)
     if(!errorSet.length) onLogin && onLogin(paramSet, clear)
     else Taro.showToast({
       title: '输入格式错误',
       icon: 'error'
     })
  }
  const handleRegister = () => {
    if(!errorSet.length) {
      onRegister && onRegister(paramSet, clear)
      handleLogin()
    }
    else Taro.showToast({
      title: '输入格式错误',
      icon: 'error'
    })
  }
  return (
    <>
      <ContentFiled className='login-wrap'>
        {logoConfigs && <Logo {...logoConfigs}></Logo>}
        {loginConfigs.map((item, key) => {
          const isError = errorSet.find((errItem) => errItem.name === item.title)
          return (
            <>
              <Input
                className={isError ? 'error-input': ''}
                key={key}
                value={paramSet[item.title]}
                placeholder={item.displayText}
                onInput={(e)=>handleInput(e,item.title)}
                password={item.type.includes('password')}
                type={item.type || 'text'}
              >
              </Input>
              {isError && <View className='error-info'>{ item.desc || item.displayText + '格式错误'}</View>}
            </>
          )
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
