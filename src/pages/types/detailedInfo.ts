export interface DetailedInfoProps {
  text: string,
  onSubmit?: (...args: any) => any,
  formatTest?: {name: string, format: RegExp}[]
  inputs: {
    placeHolder: string,
    tag: keyof DetailedInfoType
  }[]
}

export interface DetailedInfoType {
  college?: string;
  contact?: string;
  context?: string;
  from_dorm?: string;
  student_id?: string;
  teacher_id?: string;
  to_bed?: string;
  to_dorm?: string;
  [property: string]: any;
}
