import {DetailedInfoProps} from "@/pages/types/detailedInfo";

export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅用作对应学院辅导员，\n请放心填写',
  navURL: '/pages/student/application/application',
  formatTest: [{name: 'ccnuid', format: /^[0-9]{4}([0-2])[0-9]{5}$/}],
  inputs: [{
    tag: 'name',
    placeHolder: '姓名'
  }, {
    tag: 'college',
    placeHolder: '学院'
  },{
    tag: 'ccnuid',
    placeHolder: '学号'
  }]
}
export const supervisorConfig: DetailedInfoProps = {
  text: "",
  navURL: "/pages/teacher/review/review",
  formatTest: [{name: 'ccnuid', format: /^[0-9]{4}([6|9])[0-9]{5}$/}],
  inputs: [{
    tag: 'ccnuid',
    placeHolder: '工号'
  }, {
    tag: "name",
    placeHolder: "姓名"
  }]
}
export const counselorConfig: DetailedInfoProps = {
  text: "",
  navURL: "/pages/teacher/review/review",
  formatTest: [{name: 'ccnuid', format: /^[0-9]{4}([6|9])[0-9]{5}$/}],
  inputs: [{
    tag: "name",
    placeHolder: "姓名"
  }, {
    tag: "college",
    placeHolder: "学院"
  },{
    tag: 'ccnuid',
    placeHolder: '工号'
  },]
}
