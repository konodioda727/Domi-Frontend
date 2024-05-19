import {PersonalInfoResponseType} from "@/services/fetchTypes";

export interface PersonaltabProps {
  icon: string,
  navURl?: string,
  text: string,
  onClick?: (navURL: string) => any
}

export interface PersonalInfoProps {
  type: 'teacher' | 'student',
  data?: PersonalInfoResponseType
}
export type switchCarType = 'introduction' | 'feedback' | 'download' | 'exit';
