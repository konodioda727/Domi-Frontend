import Button from '@/components/button/button';
import ContentFiled from '@/components/contentField/contentFiled';
import Input from '@/components/input/input';
import Logo from '@/components/login/components/logo/logo';
import { LoginProps } from '@/components/login/types/loginProps';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchCode } from '@/services/fetch';
import { BaseEventOrig, InputProps, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useMemo, useState } from 'react';
import './login.less';

const Login: React.FC<LoginProps> = props => {
  const { loginConfigs, logoConfigs, formatTest, onLogin, onRegister } = props;
  const [paramSet, setParamSet] = useState({});
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [shouldFetchCode, setShouldFetchCode] = useState<number>(0);
  useEffect(() => {
    if (shouldFetchCode) {
      let counter = setTimeout(() => {
        setShouldFetchCode(shouldFetchCode - 1);
        clearTimeout(counter);
      }, 1000);
    }
  }, [shouldFetchCode]);
  const errorSet = useMemo(() => {
    return formatTest
      ? formatTest.filter(
          item =>
            !paramSet[item.name] ||
            !item.format.every(rule => rule.test(paramSet[item.name]))
        )
      : [];
  }, [formatTest, paramSet]);
  const handleInput = (
    e: BaseEventOrig<InputProps.inputEventDetail>,
    itemTitle: string
  ) => {
    setParamSet({ ...paramSet, [itemTitle]: e.detail.value });
  };
  const clear = () => {
    setParamSet({ ...paramSet, code: '', password: '' });
    setShouldFetchCode(0);
  };
  const handleLogin = () => {
    console.log(errorSet);
    if (!errorSet.length) onLogin && onLogin(paramSet, clear);
    else
      Taro.showToast({
        title: '输入格式错误',
        icon: 'error',
      });
  };
  const handleRegister = () => {
    if(!isLogin && paramSet['password'] !== paramSet['check']) {
      Taro.showToast({
        title: '密码不匹配',
        icon: 'error'
      })
      return;
    }
    if (!errorSet.length) {
      delete paramSet['check']
      onRegister && onRegister(paramSet, clear);
    } else
      Taro.showToast({
        title: '输入格式错误',
        icon: 'error',
      });
  };
  const handleChange = () => {
    setIsLogin(!isLogin);
  };
  const handleDiff = (e: any) => {
    setParamSet({...paramSet, check: e.target.value})
  }
  const handleCode = useDebounce(() => {
    fetchCode({ email: paramSet['email'] }).then(res => {
      console.log(res);
      if (res && res.statusCode < 300) {
        setShouldFetchCode(60);
        Taro.showToast({
          title: '验证码已发送',
        });
      }
    });
  }, 60);
  return (
    <>
      <ContentFiled className="login-wrap">
        {logoConfigs && <Logo {...logoConfigs}></Logo>}
        {loginConfigs.map((item, key) => {
          const isError = errorSet.find(errItem => errItem.name === item.title) && paramSet[item.title];
          return (
            <>
              <Input
                className={isError ? 'error-input' : ''}
                key={key}
                value={paramSet[item.title] || ''}
                placeholder={item.displayText}
                onInput={e => handleInput(e, item.title)}
                password={item.type.includes('password')}
                type={'text'}
              ></Input>
              {isError && (
                <View className="error-info">
                  {item.desc || item.displayText + '格式错误'}
                </View>
              )}
            </>
          );
        })}
        {!isLogin && (
          <View className='password-check'>
            <Input placeholderStyle={'text-align:center'} className={`${paramSet['password'] !== paramSet['check'] && 'error-input'}`} placeholder='再次输入密码' value={paramSet['check'] || ''} onInput={handleDiff} type='text' password></Input>
            {(paramSet['password'] !== paramSet['check']) && (
              <View className="error-info">密码不匹配</View>
            )}
          </View>
        )}
        {!isLogin && (
          <View className="code-wrap">
            <Input
              value={paramSet['code']}
              placeholderStyle={'text-align:center'}
              onInput={e => handleInput(e, 'code')}
              className={`code-input ${!paramSet['code'] && 'error-input'}`}
              type="text"
            ></Input>
            <Button
              className="code-button"
              disabled={shouldFetchCode > 0}
              onTap={handleCode}
            >
              {!shouldFetchCode ? '验证码' : `${shouldFetchCode}s`}
            </Button>
            {/*{!paramSet['code'] && (*/}
            {/*  <View className="error-info">验证码格式错误</View>*/}
            {/*)}*/}
          </View>
        )}
        <View className="login-buttons">
          <Button
            className="login-single-button"
            onClick={!isLogin ? handleRegister : handleLogin}
          >
            {!isLogin ? '注  册' : '登  录'}
          </Button>
        </View>
        {onRegister && (
          <View className="login-nav-link" onClick={handleChange}>
            {isLogin ? '注  册' : '登  录'}
          </View>
        )}
      </ContentFiled>
    </>
  );
};

export default Login;
