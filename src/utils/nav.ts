import Taro from "@tarojs/taro";

export const Nav = (navPath: string) => {
  Taro.navigateTo({url: navPath})
}
