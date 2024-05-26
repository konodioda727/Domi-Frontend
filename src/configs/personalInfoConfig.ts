import {PersonaltabProps, switchCarType} from "@/components/personalInfo/types/personalInfo";
import Taro from "@tarojs/taro";
import {fetchLogout} from "@/services/fetch";
import {Nav} from "@/utils/nav";

export const stuPersonalInfoTag:switchCarType[] = ['introduction', 'download', 'feedback', 'exit']
export const teaPersonalInfoTag:switchCarType[] = ['introduction', 'download', 'feedback', 'exit']

export const personalInfoConfig: {[key in switchCarType]: PersonaltabProps} = {
  introduction: {
    icon: 'https://s2.loli.net/2024/02/03/q1hkVgLceaNs4mu.png',
    text: '换宿流程说明',
    navURl: '/pages/sharing/changingSteps/changingSteps',
    onClick: () => {
    }
  },
  feedback: {
    icon: 'https://s2.loli.net/2024/02/03/Sargwk2iJqDROIf.png',
    text: '意见反馈',
    navURl: '/pages/sharing/adviceFeedback/adviceFeedback'
  },
  download: {
    icon: 'https://s2.loli.net/2024/02/03/1wimo7Pl9HMNnjS.png',
    text: '换宿申请表下载',
    navURl: ''
  },
  exit: {
    icon: 'https://s2.loli.net/2024/02/03/pCOVJsznTFoUX95.png',
    text: '退出登录',
    onClick: () => {
      fetchLogout().then((res) => {
        if(res && res.data.code === 0) {
          Taro.showToast({
            title: '登出成功',
          }).then(() => {
            Taro.clearStorage();
            Nav('/pages/index/index')
          })
        }
      })
    }
  }
}
