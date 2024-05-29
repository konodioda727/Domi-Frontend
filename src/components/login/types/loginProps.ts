import { ImageProps, InputProps } from '@tarojs/components';

export interface LoginProps {
  loginConfigs: LoginConfigType[];
  logoConfigs: LogoProps;
  onRegister?: (...args: any[]) => void;
  onLogin: (...args: any[]) => void;
  formatTest?: { name: string; format: RegExp[] }[];
}

export type LoginConfigType = {
  type: keyof InputProps.Type;
  title: string;
  displayText: string;
  desc?: string;
};

export interface LogoProps extends Omit<ImageProps, 'src'> {
  size?: 'big' | 'small' | 'medium';
}
