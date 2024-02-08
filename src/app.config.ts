export default defineAppConfig({
  navigationBarTitleText: '123',
  navigationBarBackgroundColor: '#707070',
  navigationBarTextStyle: 'black',
  navigationStyle: "custom",
  pages: [
    'pages/index/index',

    'pages/teacher/login/login',
    'pages/teacher/review/review',
    'pages/teacher/personalInfo/personalInfo',

    'pages/student/prelogin/prelogin',
    'pages/student/login/login',
    'pages/student/application/application',
    'pages/student/personalInfo/personalInfo',

    'pages/sharing/adviceFeedback/adviceFeedback',
    'pages/sharing/changingSteps/changingSteps',
    'pages/student/application/details/approvalForm/approvalForm',
    'pages/student/application/details/counsellorForm/counsellorForm',
    'pages/student/application/details/departmentForm/departmentForm',
    'pages/teacher/checking/checking'

    'pages/student/personalInfo/personalInfo'
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#005767',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: "custom",
  }
})
