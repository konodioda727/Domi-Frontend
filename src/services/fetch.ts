import { DetailedInfoType } from '@/pages/types/detailedInfo';
import {
  applicationListType,
  applicationResponseType,
  applicationType, buildingProp, buildingType,
  codeType, dormProp, dormType,
  FetchRequestBaseType,
  formStatusType,
  loginResponseType,
  loginType,
  PersonalInfoResponseType, QiniuTokenType,
  registerResponseType,
  registerType,
  reportType,
  reviewType, searchItemType,
  SuccessResultType,
  teacherLoginType,
} from '@/services/fetchTypes';
import { Nav } from '@/utils/nav';
import Taro from '@tarojs/taro';
import academys from "@/pages/student/application/details/approvalForm/formInfo";

export const baseUrl = 'https://domit.muxixyz.com';

export const fetch = <ResponseT>(
  props: FetchRequestBaseType
): Promise<SuccessResultType<ResponseT> | ''> => {
  props.url = props.base || baseUrl + props.url;
  props.header = {
    ...props.header,
    Authorization: Taro.getStorageSync('token'),
  };
  return Taro.request({ ...props })
    .then(res => {
      if (res.statusCode === 401 || res.statusCode === 403) {
        Nav('/pages/index/index');
        Taro.clearStorageSync();
      }
      return judgeStatus<ResponseT>(res) ? res : '';
    })
    .catch(err => {
      throw err;
    });
};

const judgeStatus = <T>(resp: SuccessResultType<T>) => {
  let toastText = '';
  console.log(resp.statusCode);
  switch (resp.statusCode) {
    case 400:
      toastText = '大概是输错了哦';
      break;
    case 401:
      toastText = '先登录吧';
      break;
    case 403:
      toastText = '无权访问';
      break;
    case 404:
      toastText = '查无此页';
      break;
    case 500:
      toastText = '服务器错误';
  }
  toastText &&
    Taro.showToast({
      icon: 'error',
      title: toastText,
      duration: 2000,
    });
  return toastText.length == 0;
};
export const fetchLogin = (prop: loginType) =>
  fetch<loginResponseType>({
    url: '/users/login',
    method: 'POST',
    data: prop,
  });

export const fetchTeacherLogin = (prop: teacherLoginType) =>
  fetch<loginResponseType>({
    url: '/users/login_teacher',
    method: 'POST',
    data: prop,
  });
export const fetchCode = (prop: codeType) =>
  fetch<any>({
    url: '/users/signup/code/send',
    method: 'POST',
    data: prop,
  });
export const fetchRegister = (prop: registerType) =>
  fetch<registerResponseType>({
    url: '/users/signup',
    method: 'POST',
    data: prop,
  });

export const fetchUploadForm = (prop: applicationType) =>
  fetch<any>({
    url: '/forms/submit',
    method: 'POST',
    data: prop,
  });

export const fetchLogout = () =>
  fetch<any>({
    url: '/users/logout',
    method: 'POST',
  });

export const fetchProgress = () =>
  fetch<formStatusType>({
    url: '/forms/progress',
    method: 'GET',
  });
export const fetchFormDetail = (formID: number | string) => fetch<applicationType>({
  url: `/forms/${formID}/detail`,
  method: 'GET'
})
export const fetchGetMyInfo = () =>
  fetch<PersonalInfoResponseType>({
    url: '/users/profile',
    method: 'GET',
  });

export const fetchSearchItems = (prop: searchItemType) => fetch<applicationResponseType[]>({
  url: '/forms/list/search',
  method: 'POST',
  data: prop
})
export const fetchWithdrawForm = (formId: number) =>
  fetch<any>({
    url: `/forms/${formId}/withdraw`,
    method: 'POST',
  });

export const fetchArchive = (formId: number) => fetch({
  url: `/forms/${formId}/archive`,
  method: 'POST'
})
export const fetchReport = (
  formId: number,
  reporter_role: 'RoleTutor' | 'RoleStudentAffairsOffice' | string
) =>
  fetch<reportType>({
    url: `/reports/form/${formId}/detail?reporter_role=${reporter_role}`,
    method: 'GET',
  });
export const fetchArchives = () => fetch<applicationResponseType[]>({
  url: '/forms/list/archive/passed',
  method: 'GET'
})
export const fetchReview = (prop: reviewType) =>
  fetch<any>({
    url: '/reports/review',
    method: 'POST',
    data: prop,
  });

export const fetchApproveList = ({
  cur_form_id,
  pending,
  limit,
}: applicationListType) =>
  fetch<applicationResponseType[]>({
    url: `/forms/list/approval?cur_form_id=${cur_form_id}&pending=${pending}&limit=${limit}`,
    method: 'GET',
  });
export const fetchChangeInfo = (prop: DetailedInfoType) =>
  fetch<PersonalInfoResponseType>({
    url: '/users/edit',
    method: 'POST',
    data: prop,
  });
export const fetchBuildings = (prop: buildingProp) => fetch<buildingType[]>({
  url: '/static/buildings',
  method: 'POST',
  data: prop
})
export const fetchDorms = (prop: dormProp) => fetch<dormType>({
  url: '/static/dorms',
  method: 'POST',
  data: prop
})

export const fetchQiniuToken = () => fetch<QiniuTokenType>({
  url: "/tube/access_token",
  method: 'GET'
})

export const fetchTutor = (prop: {school:  typeof academys[number]}) => fetch<string[]>({
  url: '/users/tutors',
  method: 'POST',
  data: prop
})

export const fetchUploadToQiniu = async (filePath) => {
  const {access_token, domain_name} = await fetchQiniuToken().then(e => e ? e.data.data : {access_token: '', domain_name: ''})
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: 'https://up-z2.qiniup.com',
      filePath: filePath,
      name: 'file',
      formData: {
        token: access_token
      },
      success(res) {
        resolve(`https://${domain_name}/${JSON.parse(res.data)?.key}`);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
