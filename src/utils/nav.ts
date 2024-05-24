import Taro from "@tarojs/taro";

export const Nav = (navPath: string) => {
  Taro.navigateTo({url: navPath})
}
export const Redirect = (redirectPath: string) => {
  Taro.redirectTo({url:redirectPath});
}
export const Back = () => Taro.navigateBack()
