import Taro from '@tarojs/taro'
import {
  BaseResponseType,
  FetchRequestBaseType,
  FetchResponseBaseType,
  loginResponseType,
  loginType, PersonalInfoResponseType, registerResponseType,
  registerType, uploadFormType,
} from "@/services/fetchTypes";
import {DetailedInfoType} from "@/pages/types/detailedInfo";
import {Nav} from "@/utils/nav";

const baseUrl = "http://betterdorm.japaneast.cloudapp.azure.com:8080/api/v1"
export const fetch = <ResponseT>(props: FetchRequestBaseType): Promise<FetchResponseBaseType<ResponseT> | "">  => {
  props.url = baseUrl + props.url;
  props.header = {...props.header,  token: Taro.getStorageSync('token')}
  return Taro.request({...props})
    .then((res) => {
      const data: FetchResponseBaseType<ResponseT> = res.data;
      if(res.statusCode === 403) {
        Nav('/pages/index/index')
        Taro.clearStorageSync()
      }
      return judgeStatus<ResponseT>(data)?data:""
    })
    .catch((err) => {
      throw(err)
    })
}

const judgeStatus = <T>(resp: FetchResponseBaseType<T>) => {
  let toastText = ""
  console.log(resp.code)
  switch (resp.code) {
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
  url: '/login',
  method: 'POST',
  data: prop
})

export const fetchRegister = (prop: registerType) => fetch<registerResponseType>({
  url: '/register',
  method: 'POST',
  data: prop
})

export const fetchUploadForm = (prop: uploadFormType) => fetch<BaseResponseType>({
  url: '/forms/create',
  method: 'POST',
  data: prop
})

export const fetchGetMyApplicationForm = () => fetch<uploadFormType>({
  url:'/forms/my',
  method: 'GET',
})

export const fetchGetMyInfo = () => fetch<PersonalInfoResponseType>({
  url: '/users',
  method: 'GET'
})

export const fetchChangeInfo = (prop: DetailedInfoType) => fetch<PersonalInfoResponseType>({
  url: '/users',
  method: 'POST',
  data: prop
})

export const fetchRefreshToken = () => fetch<any>({
  url: '/internal/token/refresh',
  method: 'GET'
})
