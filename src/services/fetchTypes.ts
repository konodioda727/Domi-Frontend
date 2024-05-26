import Taro from "@tarojs/taro";

export interface FetchResponseBaseType<T> {
  code: number,
  data: T,
  msg: string
}

export type SuccessResultType<T> =  Taro.request.SuccessCallbackResult<FetchResponseBaseType<T>>

export interface FetchRequestBaseType {
  method: keyof Taro.request.Method,
  url: string,
  header?: {},
  data?: {};
}

export type loginType = {
  email: string,
  password: string,
}
export type teacherLoginType = {
  pre_set_account: string,
  password: string,
}
export type codeType = {
  email: string
}
export type loginResponseType = {
  token: string
}

export type registerType = {
  email: string,
  password: string,
  code: string
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
  id: number,
  name: string,
  school: string,
  student_id: string,
  role: string,
  [property: string]: any;
}
export interface LocationType {
  bed?: string;
  building?: string;
  room?: string;
  [property: string]: any;
}
export interface formStatusType  {
  form_submit_status: string | number,
  form_id: number,
  reports: null
}
export interface applicationType {
  dst_location?: LocationType;
  name?: string;
  phone?: string;
  reason?: string;
  school?: string;
  signature?: string;
  src_location?: LocationType;
  student_id?: string;
  tutor?: string;
  [property: string]: any;
}
export interface reportType {
  ctime?: number;
  detail?: string;
  form_id?: number;
  id?: number;
  pass?: boolean;
  reporter?: number;
  reporter_role?: string;
  signature?: string;
  stamp?: string;
  [property: string]: any;
}
