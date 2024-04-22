import Taro from "@tarojs/taro";

export interface FetchResponseBaseType<T> {
  code: number,
  data: T,
  msg: string
}
export type BaseResponseType = FetchResponseBaseType<any>

export interface FetchRequestBaseType {
  method: keyof Taro.request.Method,
  url: string,
  header?: {},
  data?: {};
}

export type loginType = {
  name: string,
  passwd: string
}
export type loginResponseType = {
  token: string
}

export type registerType = {
  ccnuid: string,
  name: string,
  passwd: string
}

export type registerResponseType = {

}
export type uploadFormType = {
  college?: string;
  contact?: string;
  context?: string;
  from_dorm?: string;
  student_id?: string;
  teacher_id?: string;
  to_bed?: string;
  to_dorm?: string;
}
export interface PersonalInfoResponseType {
  ccnuid: string;
  id: string;
  name: string;
  passwd: string;
  role: number;
  school: string;
  stage: string;
  uid: string;
  valid: number;
  [property: string]: any;
}
