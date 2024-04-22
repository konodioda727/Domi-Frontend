import {DetailedInfoProps} from "@/pages/types/detailedInfo";

export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅用作对应学院辅导员，\n请放心填写',
  navURL: '/pages/student/application/application',
  inputs: [{
    tag: 'name',
    placeHolder: '姓名'
  }, {
    tag: 'college',
    placeHolder: '学院'
  },{
    tag: 'student_id',
    placeHolder: '学号'
  }]
}
export const supervisorConfig: DetailedInfoProps = {
  text: "",
  navURL: "/pages/teacher/review/review",
  inputs: [{
    tag: 'teacher_id',
    placeHolder: '工号'
  }, {
    tag: "name",
    placeHolder: "姓名"
  }]
}
export const counselorConfig: DetailedInfoProps = {
  text: "",
  navURL: "/pages/teacher/review/review",
  inputs: [{
    tag: "name",
    placeHolder: "姓名"
  }, {
    tag: "college",
    placeHolder: "学院"
  },{
    tag: 'teacher_id',
    placeHolder: '工号'
  },]
}
