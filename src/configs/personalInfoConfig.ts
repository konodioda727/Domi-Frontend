import {
  PersonaltabProps,
  switchCarType,
} from '@/components/personalInfo/types/personalInfo';
import { fetchLogout } from '@/services/fetch';
import {Redirect} from '@/utils/nav';
import Taro from '@tarojs/taro';

export const stuPersonalInfoTag: switchCarType[] = [
  'introduction',
  'download',
  'feedback',
  'stuChange',
  // 'exit',
];
export const teaPersonalInfoTag: switchCarType[] = [
  'introduction',
  'download',
  'feedback',
  'teaChange',
  // 'exit',
];

export const personalimgList = {
  intro: 'https://s2.loli.net/2024/02/03/q1hkVgLceaNs4mu.png',
  feedback: 'https://s2.loli.net/2024/02/03/Sargwk2iJqDROIf.png',
  download: 'https://s2.loli.net/2024/02/03/1wimo7Pl9HMNnjS.png',
  change: 'https://s2.loli.net/2024/08/13/v7eomwZ3aHp82hL.png',
  exit: 'https://s2.loli.net/2024/02/03/pCOVJsznTFoUX95.png'
}

export const personalInfoConfig: { [key in switchCarType]: PersonaltabProps } =
  {
    introduction: {
      icon: personalimgList.intro,
      text: '换宿流程说明',
      navURl: '/pages/sharing/changingSteps/changingSteps',
      onClick: () => {},
    },
    feedback: {
      icon: personalimgList.feedback,
      text: '意见反馈',
      navURl: '/pages/sharing/adviceFeedback/adviceFeedback',
    },
    download: {
      icon: personalimgList.download,
      text: '换宿申请表查看',
      navURl: '/pages/sharing/archive/archive',
    },
    teaChange: {
      icon: personalimgList.change,
      text: '修改密码',
      navURl: '/pages/teacher/changePassword/index'
    },
    stuChange: {
      icon: personalimgList.change,
      text: '修改密码',
      navURl: '/pages/student/changePassword/index'
    },
    exit: {
      icon: personalimgList.exit,
      text: '退出登录',
      onClick: () => {
        fetchLogout().then(res => {
          if (res && res.data.code === 0) {
            Taro.showToast({
              title: '登出成功',
            }).then(() => {
              Taro.clearStorage();
              Redirect('/pages/index/index');
            });
          }
        });
      },
    },
  };
