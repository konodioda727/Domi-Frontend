import React from "react";
import {Image, View} from "@tarojs/components";
import {NavbarItemProps} from "@/components/navbar/types/navbarItem";
import Taro from "@tarojs/taro";
import './navbarItem.less'

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  const {imgURL, navURL, text} = props
  let regPath = imgURL;
  // 判断当前路径是否与navURL相同，相同则改变颜色
  const router = Taro.getCurrentInstance().router || Taro.useRouter();
  if(router && router.path === navURL) {
    regPath = imgURL.replace(/unselected/g, "selected")
  } else {
    regPath = imgURL.replace(/(un)?selected/g, "unselected")
  }
  const handleClick = () => {
    Taro.navigateTo({
      url: navURL
    })
  }
  return <>
    <View className='navbar-item' onClick={handleClick}>
      <Image className='navbar-item-img' src={require(`../../../../assets/images/${regPath}.svg`)}></Image>
      {text && <View className='navbar-item-text'>{text}</View>}
    </View>
  </>
}

export default NavbarItem
