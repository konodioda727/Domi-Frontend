import {LoginPageProps} from "@/pages/types/loginProps";
import {Redirect} from "@/utils/nav";
import {fetchLogin, fetchRegister} from "@/services/fetch";
import {loginType} from "@/services/fetchTypes";
import Taro from "@tarojs/taro";

export const teaLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [{
      type: 'text',
      title: 'ccnuid',
      displayText: '工号'
    }, {
      type: 'text',
      title: 'name',
      displayText: '姓名'
    }, {
      type: 'safe-password',
      title: 'pass',
      displayText: '密码'
    }],
    logoConfigs: {
      size:'medium'
    },
    formatTest: [{name: 'ccnuid', format:/^[0-9]{4}([6|9])[0-9]{5}$/}],
    onLogin: (paramSet: loginType, clear: () => any) => {
     fetchLogin(paramSet).then((data) => {
        console.log(data)
        data && Taro.setStorageSync('token', data.data.token)
        data && ToReview()
      }).then(() => {
        clear && clear()
      })
    },
    onRegister: (paramSet, clear) => {
      fetchRegister(paramSet).then(() => {
        Taro.showToast({
          title: '注册成功,登陆试试吧',
          icon: 'error'
        })
        clear && clear()
      })
    }
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '教师登录',
  }
}
export const stuLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [{
      type: 'text',
      title: 'name',
      displayText: '账号'
    }, {
      type: 'safe-password',
      title: 'passwd',
      displayText: '密码'
    }],
    logoConfigs: {
      size:'medium'
    },
    formatTest: [{name: 'ccnuid', format:/^[0-9]{4}([0-2])[0-9]{5}$/}],
    onLogin: (paramSet: loginType, clear: () => any) => {
     fetchLogin(paramSet).then((data) => {
       data && ToApplication()
       data && Taro.setStorageSync('token', data.data.token)
     }).then(() => {
       clear && clear()
     })
    },
    onRegister: (paramSet, clear) => {
      fetchRegister(paramSet).then(() => {
        Taro.showToast({
          title: '注册成功,登陆试试吧',
          icon: 'error'
        })
        clear && clear()
      })
    }
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '学生登录',
  }
}

const ToApplication = () => {
  Redirect('/pages/student/detailedInfo/detailedInfo')
}
const ToReview = () => {
  const identification = 'Counselor'
  Redirect(`/pages/teacher/detailedInfo${identification}/detailedInfo${identification}`)
}
