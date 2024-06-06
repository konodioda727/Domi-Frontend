import Taro from '@tarojs/taro';

export const Nav = (navPath: string) => {
  return Taro.navigateTo({ url: navPath });
};
export const Redirect = (redirectPath: string) => {
  Taro.reLaunch({ url: redirectPath });
};
export const Back = () => Taro.navigateBack();
