import {IdentityMap} from "@/pages/index/indexProps";

export const indexConfig: IdentityMap[] = [{
  text: '我是学生',
  imgURL: 'https://s2.loli.net/2024/01/28/yv19igfTzhR8U6o.png',
  navURL: 'student/login/login'
},{
  text: '我是辅导员',
  imgURL: 'https://s2.loli.net/2024/01/28/2ng95QoyqCLkeNc.png',
  navURL: 'teacher/login/login'
},{
  text: '我是学工部负责人',
  imgURL: 'https://s2.loli.net/2024/01/28/ENWyPYGF9sfrCXz.png',
  navURL: 'teacher/login/login'
}]
export const ifLoginNavPath: {[key: string]: string} = {
  'RoleTutor': '/pages/teacher/review/review',
  'RoleStudent': '/pages/student/application/application',
  'RoleStudentAffairsOffice': '/pages/teacher/review/review',
}
export const ifInfoEditNavPath: {[key: string]: string} = {
  'RoleTutor': '/pages/teacher/detailedInfo/detailedInfo',
  'RoleStudent': '/pages/student/detailedInfo/detailedInfo',
  'RoleStudentAffairsOffice': '/pages/teacher/detailedInfo/detailedInfo',
}
