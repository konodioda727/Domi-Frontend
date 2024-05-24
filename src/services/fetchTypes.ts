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
  passwd: string,
  ccnuid?: string
}
export type loginResponseType = {
  token: string
}

export type registerType = {
  ccnuid?: string,
  name: string,
  passwd: string
}

export type registerResponseType = {

}
export type uploadFormType = {
  college?: string;
  community_advice?: string;
  contact?: string;
  context?: string;
  create_at?: string;
  from_bed?: string;
  from_dorm?: string;
  hqzb_advice?: string;
  id?: string;
  status?: number;
  student_id?: string;
  teacher_advice?: string;
  teacher_id?: string;
  to_bed?: string;
  to_dorm?: string;
  xgb_advice?: string;
  [property: string]: any;
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
