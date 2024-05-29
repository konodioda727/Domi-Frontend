import { LoginPageProps } from '@/pages/types/loginProps';
import {
  fetchGetMyInfo,
  fetchLogin,
  fetchRegister,
  fetchTeacherLogin,
} from '@/services/fetch';
import {
  FetchResponseBaseType,
  SuccessResultType,
  loginResponseType,
  loginType,
  registerResponseType,
  teacherLoginType,
} from '@/services/fetchTypes';
import { Redirect } from '@/utils/nav';
import { emailRegex } from '@/utils/regexps';
import Taro from '@tarojs/taro';

export const teaLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [
      {
        type: 'text',
        title: 'pre_set_account',
        displayText: '预制账号',
        desc: '请输入预制账号',
      },
      {
        type: 'safe-password',
        title: 'password',
        displayText: '密码',
        desc: '密码必须包含字母、数字、#',
      },
    ],
    logoConfigs: {
      size: 'medium',
    },
    formatTest: [
      { name: 'pre_set_account', format: [/^\S+/] },
      { name: 'password', format: [/^\S+/] },
    ],
    onLogin: (paramSet: teacherLoginType, clear: () => any) => {
      fetchTeacherLogin(paramSet).then(res => {
        if (res && res.data.code === 0) loginSuccessProcess(res, ToReview);
        else {
          Taro.showToast({
            title: res && res.data.msg,
            icon: 'error',
          }).then(() => {
            clear && clear();
          });
        }
      });
    },
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '教师登录',
  },
};
export const stuLoginConfig: LoginPageProps = {
  loginProps: {
    loginConfigs: [
      {
        type: 'text',
        title: 'email',
        displayText: '邮箱',
        desc: '邮箱格式错误，请输入正确邮箱',
      },
      {
        type: 'safe-password',
        title: 'password',
        displayText: '密码',
        desc: '密码必须包含字母、数字、#',
      },
    ],
    logoConfigs: {
      size: 'medium',
    },
    formatTest: [
      { name: 'password', format: [/^\S+/, /[a-zA-Z]/, /#/, /[0-9]/] },
      { name: 'email', format: [emailRegex] },
    ],
    onLogin: (paramSet: loginType, clear: () => any) => {
      fetchLogin(paramSet).then(res => {
        if (res && res.data.code === 0) loginSuccessProcess(res, ToApplication);
        else {
          Taro.showToast({
            title: res && res.data.msg,
            icon: 'none',
          }).then(() => clear && clear());
        }
      });
    },
    onRegister: (paramSet, clear) => {
      fetchRegister(paramSet).then(res => {
        if (res && res.data.code === 0) registerSuccessProcess(res.data);
        else {
          Taro.showToast({
            title: res && res.data.msg,
            icon: 'none',
          }).then(() => clear && clear());
        }
      });
    },
  },
  topBarProps: {
    pos: 'leftWithButton',
    children: '学生登录',
  },
};

const loginSuccessProcess = (
  res: SuccessResultType<loginResponseType>,
  navigate?: () => void
) => {
  if (res && res.data.code === 0) {
    console.log(res.header['X-Jwt-Token']);
    res && Taro.setStorageSync('token', 'Bearer ' + res.header['X-Jwt-Token']);
    Taro.showToast({
      title: '登陆成功!',
      icon: 'success',
    }).then(() => res && navigate && navigate());
  }
};

const registerSuccessProcess = (
  data: FetchResponseBaseType<registerResponseType>
) => {
  if (data && data.code < 300) {
    Taro.showToast({
      title: '注册成功,去登陆试试吧',
      icon: 'none',
    });
  }
};

const ToApplication = () => {
  fetchGetMyInfo().then(res => {
    res && res.data.data.student_id
      ? Redirect('/pages/student/application/application')
      : Redirect('/pages/student/detailedInfo/detailedInfo');
  });
};
const ToReview = () => {
  // const identification = 'Counselor'
  Redirect(`/pages/teacher/review/review`);
  // Redirect(`/pages/teacher/detailedInfo${identification}/detailedInfo${identification}`)
};
