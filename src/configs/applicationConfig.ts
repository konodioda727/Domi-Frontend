import {
  applicationTaskState,
  applicationType, imgListType,
} from '@/pages/student/application/applicationProps';

// 成功、失败颜色
export const colorMap: { [key in applicationTaskState]: string } = {
  pending: 'rgb(178,204,209)',
  success: '#F2C43B',
  fail: '#FF5555',
};

// 成功、失败图片
export const imgMap: imgListType = {
  success: 'https://s2.loli.net/2024/02/02/C7MPNeEL5QOsRZk.png',
  fail: 'https://s2.loli.net/2024/07/06/3Sj2lKCs1WeYgxB.png',
  pending: '',
};
export const submitMap: imgListType = {
  success: 'https://s3.bmp.ovh/imgs/2024/06/03/0b57d0e16e1ad8a8.png',
  fail: '',
  pending: ''
}
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

export const progressBarImg = 'https://s2.loli.net/2024/05/17/pM3L8sOhlnjCbgv.png'
