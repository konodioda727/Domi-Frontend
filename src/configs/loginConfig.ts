import {LoginPageProps} from "@/pages/types/loginProps";
import {Nav} from "@/utils/nav";

export const teaLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [{
      type: 'text',
      title: 'num',
      displayText: '工号'
    }, {
      type: 'safe-password',
      title: 'pass',
      displayText: '密码'
    }],
    logoConfigs: {
      size:'medium'
    },
    onLogin: (paramSet, clear) => {
      console.log('login', paramSet)
      clear && clear()
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
      title: 'account',
      displayText: '账号'
    }, {
      type: 'safe-password',
      title: 'pass',
      displayText: '密码'
    }],
    logoConfigs: {
      size:'medium'
    },
    onLogin: (paramSet, clear) => {
      console.log('login', paramSet)
      clear && clear()
      ToApplication()
    },
    onRegister: (paramSet, clear) => {
      console.log('register', paramSet)
      clear && clear()
      ToApplication()
    }
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '学生登录',
  }
}

const ToApplication = () => {
  Nav('/pages/student/application/application')
}
