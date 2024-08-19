import Modal from '@/components/modal';
import academys from '@/pages/student/application/details/approvalForm/formInfo';
import { DetailedInfoProps } from '@/pages/types/detailedInfo';
import { fetchChangeInfo, fetchEditPassword } from '@/services/fetch';
import { Nav, Redirect } from '@/utils/nav';
import { IDRegex } from '@/utils/regexps';
import Taro from '@tarojs/taro';

const { student } = IDRegex;
export const teacherNavUrl = '/pages/teacher/review/review';
const stuNavUrl = '/pages/student/application/application';
export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅辅导员与学工部负责人可见，提交后不可修改，请确保正确无误',
  formatTest: [{ name: 'student_id', format: [student] }],
  inputs: [
    {
      tag: 'name',
      placeHolder: '姓名',
    },
    {
      tag: 'sex',
      placeHolder: '请选择性别',
      type: 'picker',
      range: ['请选择性别','男', '女'],
    },
    {
      tag: 'student_id',
      placeHolder: '学号',
    },
    {
      tag: 'school',
      placeHolder: academys[0],
      type: 'picker',
      range: academys,
    },
  ],
  onSubmit: (inputSet: { [key: string]: string }) =>
    handleSubmit(inputSet, stuNavUrl),
};
export const supervisorConfig: DetailedInfoProps = {
  text: '',
  inputs: [
    {
      tag: 'name',
      placeHolder: '姓名',
    },
  ],
  onSubmit: (inputSet: { [key: string]: string }) =>
    handleSubmit(inputSet, teacherNavUrl),
};
export const counselorConfig: DetailedInfoProps = {
  text: '',
  inputs: [
    {
      tag: 'name',
      placeHolder: '姓名',
    },
    {
      tag: 'school',
      placeHolder: academys[0],
      type: 'picker',
      range: academys,
    },
  ],
  onSubmit: (inputSet: { [key: string]: string }) =>
    handleSubmit(inputSet, teacherNavUrl),
};

export const handleSubmit = (
  inputSet: { [key: string]: string },
  navUrl: string
) => {
  fetchChangeInfo(inputSet).then(res => {
    if (res && res.data.code === 0) {
      Taro.showToast({
        title: '信息修改成功',
        icon: 'success',
      }).then(() => {
        Nav(navUrl);
      });
    } else {
      Taro.showToast({
        title: '网络错误',
      });
    }
  });
};
export const teacherConfig: DetailedInfoProps = {
  text: '老师您好',
  inputs: [
    {
      tag: 'current',
      placeHolder: '目前账号',
      size: 'sm',
      disabled: true,
      data: 'currentAcc'
    },
    {
      tag: 'new_account',
      placeHolder: '新账号',
    },
    {
      tag: 'new_password',
      placeHolder: '新密码'
    },
    {
      tag: 'confirm',
      placeHolder: '确认密码',
      confirm: 'new_password'
    }
  ],
  onSubmit: (inputSet: { [key: string]: string }) => fetchEditPassword({new_password: inputSet['new_password']}).then(res => {
    if (res && res.data.code === 0) {
      Modal.show({
        content: '信息修改成功',
        onSuccess: () => {
          Redirect(teacherNavUrl);
        }
      })
    } else {
      Modal.show({
        content: res && res.data.msg,
      });
    }
  }),
}