import academys from '@/pages/student/application/details/approvalForm/formInfo';
import { DetailedInfoProps } from '@/pages/types/detailedInfo';
import { fetchChangeInfo } from '@/services/fetch';
import { Nav } from '@/utils/nav';
import { IDRegex } from '@/utils/regexps';
import Taro from '@tarojs/taro';

const { student } = IDRegex;
const teacherNavUrl = '/pages/teacher/review/review';
const stuNavUrl = '/pages/student/application/application';
export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅用作对应学院辅导员，\n请放心填写',
  formatTest: [{ name: 'student_id', format: [student] }],
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
    {
      tag: 'student_id',
      placeHolder: '学号',
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
