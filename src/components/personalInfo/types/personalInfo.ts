export interface PersonaltabProps {
  icon: string,
  navURl?: string,
  text: string,
  onClick?: (navURL: string) => any
}

export type switchCarType = 'introduction' | 'feedback' | 'download' | 'exit';
