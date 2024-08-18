export interface DetailedInfoProps {
  text: string;
  data?: Record<string, any>;
  onSubmit?: (...args: any) => any;
  formatTest?: { name: string; format: RegExp[] }[];
  inputs: {
    placeHolder: string;
    tag: keyof DetailedInfoType;
    type?: 'text' | 'picker';
    range?: string[];
    size?: 'sm' | 'bg' |'md';
    disabled?: boolean;
    data?: string
  }[];
}

export interface DetailedInfoType {
  name?: string;
  school?: string;
  student_id?: string;
  [property: string]: any;
}
