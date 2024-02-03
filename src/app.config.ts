export default defineAppConfig({
  navigationBarTitleText: '123',
  navigationBarBackgroundColor: '#707070',
  navigationBarTextStyle: 'black',
  navigationStyle: "custom",
  pages: [
    'pages/index/index',

    'pages/teacher/login/login',

    'pages/student/prelogin/prelogin',
    'pages/student/login/login',
    'pages/student/application/application',
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
