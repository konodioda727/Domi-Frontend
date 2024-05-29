import {
  applicationTaskState,
  applicationType,
} from '@/pages/student/application/applicationProps';

// 成功、失败颜色
export const colorMap: { [key in applicationTaskState]: string } = {
  pending: 'rgb(178,204,209)',
  success: '#F2C43B',
  fail: '#FF5555',
};

// 成功、失败图片
export const imgMap: { [key in applicationTaskState]: string } = {
  success: 'https://s2.loli.net/2024/02/02/C7MPNeEL5QOsRZk.png',
  fail: 'https://s2.loli.net/2024/02/02/VZ9eNsjYDUigKEI.png',
  pending: '',
};
export const applicationNavConfigs: applicationType = {
  // 提交页面路径
  submitPath: '/pages/student/application/details/approvalForm/approvalForm',
  // 修改页面路径
  editPath: '/pages/student/application/details/approvalForm/approvalForm',
  // 辅导员审核页面路径
  counselorPath:
    '/pages/student/application/details/counsellorForm/counsellorForm',
  // 学工部页面路径
  studentAffairPath:
    '/pages/student/application/details/departmentForm/departmentForm',
};

export const statusArr = ['未提交', '已提交'];
