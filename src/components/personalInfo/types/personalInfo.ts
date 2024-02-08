export interface PersonaltabProps {
  icon: string,
  navURl?: string,
  text: string,
  onClick?: (navURL: string) => any
}

export interface PersonalInfoProps {
  type: 'teacher' | 'student',
  data: {
    name: string,
    ID: string,
    campus: string,
    grade: string
  }
}
export type switchCarType = 'introduction' | 'feedback' | 'download' | 'exit';
