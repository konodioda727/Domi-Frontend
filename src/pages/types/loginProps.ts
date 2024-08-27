import { LoginProps } from '@/components/login/types/loginProps';
import { TopBarProps } from '@/components/pageWrap/types/pageWrap';

export interface LoginPageProps {
  topBarProps: TopBarProps;
  loginProps: LoginProps;
}
export const APPLICATION_STATUS = {
  /** 提交申请表 */
  SUBMIT: 'StatusSubmit',
  /** 辅导员通过 */
  TURO_PASS: 'StatusTutorPass',
  /** 学工部通过 */
  STU_AFFAIR_PASS: 'StatusStudentAffairsOfficePass'
}