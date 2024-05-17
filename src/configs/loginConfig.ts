import {LoginPageProps} from "@/pages/types/loginProps";
import {Redirect} from "@/utils/nav";
import {fetchLogin, fetchRegister} from "@/services/fetch";
import {FetchResponseBaseType, loginResponseType, loginType, registerResponseType} from "@/services/fetchTypes";
import Taro from "@tarojs/taro";

export const teaLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [{
      type: 'text',
      title: 'ccnuid',
      displayText: '工号',
      desc: '学工号格式错误，请输入正确学工号'
    }, {
      type: 'text',
      title: 'name',
      displayText: '姓名',
      desc: '姓名不为空'
    }, {
      type: 'safe-password',
      title: 'passwd',
      displayText: '密码',
      desc: '密码不为空'
    }],
    logoConfigs: {
      size:'medium'
    },
    formatTest: [
      {name: 'ccnuid', format:/^[0-9]{4}([6|9])[0-9]{5}$/},
      {name: 'passwd', format: /^\S+/},
      {name: 'name', format: /^\S+/}
    ],
    onLogin: (paramSet: loginType, clear: () => any) => {
     fetchLogin(paramSet).then((data) => {
        data && loginSuccessProcess(data, ToReview)
      }).then(() => {
        clear && clear()
      })
    },
    onRegister: (paramSet, clear) => {
      fetchRegister(paramSet).then((data) => {
        data && registerSuccessProcess(data)
      }).then(() => clear && clear())
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
      displayText: '账号',
      desc: '账号不为空'
    }, {
      type: 'safe-password',
      title: 'passwd',
      displayText: '密码',
      desc: '密码不为空'
    }],
    logoConfigs: {
      size:'medium'
    },
    formatTest: [
      {name: 'passwd', format: /^\S+/},
      {name: 'name', format: /^\S+/}
    ],
    onLogin: (paramSet: loginType, clear: () => any) => {
     fetchLogin(paramSet).then((data) => {
       data && loginSuccessProcess(data, ToApplication)
     }).then(() => {
       clear && clear()
     })
    },
    onRegister: (paramSet, clear) => {
      fetchRegister(paramSet).then((data) => {
       data && registerSuccessProcess(data)
      }).then(() => clear && clear())
    }
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '学生登录',
  }
}

const loginSuccessProcess = (data: FetchResponseBaseType<loginResponseType>, navigate?: () => void) => {
  if(data && data.code < 300) {
    data && navigate && navigate()
    data && Taro.setStorageSync('token', data.data.token)
    Taro.showToast({
      title: '登陆成功!',
      icon: 'success'
    })
  }
}

const registerSuccessProcess = (data: FetchResponseBaseType<registerResponseType>) => {
  if(data && data.code < 300) {
    Taro.showToast({
      title: '注册成功,正在登录',
      icon: 'none'
    })
  }
}

const ToApplication = () => {
  Redirect('/pages/student/detailedInfo/detailedInfo')
}
const ToReview = () => {
  const identification = 'Counselor'
  Redirect(`/pages/teacher/detailedInfo${identification}/detailedInfo${identification}`)
}
