import {
  defaultStuNavbarProps,
  defaultTeaNavbarProps,
} from '@/configs/navbarConfig';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import NavbarItem from './components/navbarItem/navbarItem';
import './navbar.less';
import { NavBarProps } from './types/navbarItem';

const Navbar: React.FC<NavBarProps> = () => {
  const router = Taro.getCurrentInstance().router || Taro.useRouter();
  const path = router.path;
  const items = path.includes('teacher')
    ? defaultTeaNavbarProps
    : defaultStuNavbarProps;
  return (
    <View className="navbar">
      {items &&
        items.map(item => {
          return <NavbarItem {...item} />;
        })}
    </View>
  );
};

export default Navbar;

