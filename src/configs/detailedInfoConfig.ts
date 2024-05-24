import {DetailedInfoProps} from "@/pages/types/detailedInfo";
import {fetchChangeInfo, fetchRefreshToken} from "@/services/fetch";
import {IDRegex} from "@/utils/regexps";
import {Nav} from "@/utils/nav";
import Taro from "@tarojs/taro";

const {student, teacher} = IDRegex
const teacherNavUrl = "/pages/teacher/review/review"
const stuNavUrl = '/pages/student/application/application'
export const studentConfig: DetailedInfoProps = {
  text: '同学你好：\n本页信息仅用作对应学院辅导员，\n请放心填写',
  formatTest: [{name: 'ccnuid', format: student}],
  inputs: [{
    tag: 'uid',
    placeHolder: '姓名'
  }, {
    tag: 'school',
    placeHolder: '学院'
  },{
    tag: 'ccnuid',
    placeHolder: '学号'
  }],
  onSubmit: (inputSet: {[key: string]: string}) => handleSubmit(inputSet, stuNavUrl)
}
export const supervisorConfig: DetailedInfoProps = {
  text: "",
  formatTest: [{name: 'ccnuid', format: teacher}],
  inputs: [{
    tag: 'ccnuid',
    placeHolder: '工号'
  }, {
    tag: "uid",
    placeHolder: "姓名"
  }],
  onSubmit: (inputSet: {[key: string]: string}) => handleSubmit(inputSet, teacherNavUrl)
}
export const counselorConfig: DetailedInfoProps = {
  text: "",
  formatTest: [{name: 'ccnuid', format: teacher}],
  inputs: [{
    tag: "uid",
    placeHolder: "姓名"
  }, {
    tag: "school",
    placeHolder: "学院"
  },{
    tag: 'ccnuid',
    placeHolder: '工号'
  },],
  onSubmit: (inputSet: {[key: string]: string}) => handleSubmit(inputSet, teacherNavUrl)
}

export const handleSubmit = (inputSet: {[key: string]: string}, navUrl: string) => {
  fetchChangeInfo(inputSet).then(res => {
    if(res && res.code < 300) {
      fetchRefreshToken().then((resp)=>{
        resp && Taro.showToast({
          title: '信息修改成功',
          icon: 'success'
        }).then(() => {
          Taro.setStorageSync('token', resp.data.token)
          Nav(navUrl)
        })
      })

    } else {
      Taro.showToast({
        title: '网络错误'
      })
    }
  })
}
