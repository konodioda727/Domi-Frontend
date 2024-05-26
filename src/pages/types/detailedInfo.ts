export interface DetailedInfoProps {
  text: string,
  onSubmit?: (...args: any) => any,
  formatTest?: {name: string, format: RegExp[]}[]
  inputs: {
    placeHolder: string,
    tag: keyof DetailedInfoType,
    type?: 'text' | 'picker',
    range?: string[]
  }[]
}

export interface DetailedInfoType {
  name?: string;
  school?: string;
  student_id?: string;
  [property: string]: any;
}
