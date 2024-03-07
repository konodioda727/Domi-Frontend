import {DetailedInfoProps} from "@/pages/types/detailedInfo";

export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅用作对应学院辅导员，\n请放心填写',
  navURL: '/pages/student/application/application',
  inputs: [{
    tag: 'name',
    placeHolder: '姓名'
  }, {
    tag: 'campus',
    placeHolder: '学院'
  },{
    tag: 'stuID',
    placeHolder: '学号'
  }]
}
export const supervisorConfig: DetailedInfoProps = {
  text: "",
  navURL: "/pages/teacher/review/review",
  inputs: [{
    tag: 'workerID',
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
    tag: "campus",
    placeHolder: "学院"
  },{
    tag: 'workerID',
    placeHolder: '工号'
  },]
}
