import {defaultStuNavbarProps, defaultTeaNavbarProps} from "@/configs/navbarConfig";
import { View } from '@tarojs/components';
import React from "react";
import NavbarItem from "@/components/navbar/components/navbarItem/navbarItem";
import { NavBarProps} from "@/components/navbar/types/navbarItem";
import Taro from "@tarojs/taro";
import './navbar.less'


const Navbar: React.FC<NavBarProps> = (props) => {
  const {items} = props;
  // useImagePreload(preloadImgList)
  return (
    <View className='navbar'>
      {items && items.map((item) => {
        return <NavbarItem {...item} />
      })}
    </View>
  );
}

export default Navbar

Navbar.defaultProps = (() => {
  const router = Taro.getCurrentInstance().router || Taro.useRouter();
  const path = router.path;
  return {
    items: path.includes('teacher')? defaultTeaNavbarProps: defaultStuNavbarProps
  };
})();
