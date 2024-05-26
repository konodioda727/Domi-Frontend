import Taro from '@tarojs/taro'
import {
  applicationListType,
  applicationResponseType,
  applicationType,
  codeType,
  FetchRequestBaseType, formStatusType,
  loginResponseType,
  loginType, PersonalInfoResponseType, registerResponseType,
  registerType, reportType, reviewType, SuccessResultType, teacherLoginType,
} from "@/services/fetchTypes";
import {DetailedInfoType} from "@/pages/types/detailedInfo";
import {Nav} from "@/utils/nav";

const baseUrl = "https://domi.bigdust.space"
export const fetch = <ResponseT>(props: FetchRequestBaseType): Promise<SuccessResultType<ResponseT> | "">  => {
  props.url = baseUrl + props.url;
  props.header = {...props.header,  Authorization: Taro.getStorageSync('token')}
  return Taro.request({...props})
    .then((res) => {
      if(res.statusCode === 403) {
        Nav('/pages/index/index')
        Taro.clearStorageSync()
      }
      return judgeStatus<ResponseT>(res)?res:""
    })
    .catch((err) => {
      throw(err)
    })
}

const judgeStatus = <T>(resp: SuccessResultType<T>) => {
  let toastText = ""
  console.log(resp.statusCode)
  switch (resp.statusCode) {
    case 400:
      toastText = "大概是输错了哦"
      break;
    case 401:
      toastText = "先登录吧"
      break;
    case 403:
      toastText = "无权访问"
      break;
    case 404:
      toastText = "查无此页"
      break;
    case 500:
      toastText = "服务器错误"
  }
  toastText && Taro.showToast({
    icon: "error",
    title: toastText,
    duration: 2000
  })
  return toastText.length == 0
}
export const fetchLogin = (prop: loginType) => fetch<loginResponseType>({
  url: '/users/login',
  method: 'POST',
  data: prop
})

export const fetchTeacherLogin = (prop: teacherLoginType) => fetch<loginResponseType>({
  url: '/users/login_teacher',
  method: 'POST',
  data: prop
})
export const fetchCode = (prop: codeType) => fetch<any>({
  url: '/users/signup/code/send',
  method: 'POST',
  data: prop
})
export const fetchRegister = (prop: registerType) => fetch<registerResponseType>({
  url: '/users/signup',
  method: 'POST',
  data: prop
})

export const fetchUploadForm = (prop: applicationType) => fetch<any>({
  url: '/forms/submit',
  method: 'POST',
  data: prop
})

export const fetchLogout = () => fetch<any>({
  url: '/users/logout',
  method: 'POST'
})

export const fetchProgress = () => fetch<formStatusType>({
  url: '/forms/progress',
  method: 'GET'
})

export const fetchGetMyInfo = () => fetch<PersonalInfoResponseType>({
  url: '/users/profile',
  method: 'GET'
})
export const fetchWithdrawForm = (formId: number) => fetch<any>({
  url: `/forms/${formId}/withdraw`,
  method: 'POST'
})
export const fetchReport = (formId: number, reporter_role: 'RoleTutor' | 'RoleStudentAffairsOffice') => fetch<reportType>({
  url: `/reports/form/${formId}/detail?reporter_role=${reporter_role}`,
  method: 'GET'
})

export const fetchReview = (prop: reviewType) => fetch<any>({
  url: '/reports/review',
  method: 'POST',
  data: prop
})

export const fetchApproveList = ({cur_form_id, pending, limit}: applicationListType) => fetch<applicationResponseType[]>({
  url: `/forms/list/approval?cur_form_id=${cur_form_id}&pending=${pending}&limit=${limit}`,
  method: 'GET'
})
export const fetchChangeInfo = (prop: DetailedInfoType) => fetch<PersonalInfoResponseType>({
  url: '/users/edit',
  method: 'POST',
  data: prop
})
