import Button from '@/components/button/button';
import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import {
  applicationNavConfigs,
  colorMap,
  imgMap, progressBarImg,
} from '@/configs/applicationConfig';
import {
  TaskElemProps,
  applicationTaskState,
} from '@/pages/student/application/applicationProps';
import {
  fetchArchive, fetchGetMyInfo,
  fetchProgress,
  fetchReport,
  fetchWithdrawForm,
} from '@/services/fetch';
import { formStatusType } from '@/services/fetchTypes';
import { Nav } from '@/utils/nav';
import { Image, View } from '@tarojs/components';
import Taro, {useDidShow} from '@tarojs/taro';
import React, { useState } from 'react';
import './application.less';

definePageConfig({
  disableScroll: true
})

type curStatusType = formStatusType & {
  submitted: applicationTaskState;
  teaApproved: applicationTaskState;
  officeApproved: applicationTaskState;
};
const Application: React.FC = () => {
  const { counselorPath, studentAffairPath, submitPath } =
    applicationNavConfigs;
  const [formId, setFormId] = useState<number>(0)
  const [currentStatus, setCurrentStatus] = useState<curStatusType>();
  const getInfo = () => {
    fetchGetMyInfo().then((res) => {
      if(res && res.data.code === 0) {
        Taro.setStorageSync('form_info', {...Taro.getStorageSync('form_info'),...res.data.data})
      }
    })
    fetchProgress()
      .then(res => {
        if (res && res.data.code === 0) {
          setFormId(res.data.data.form_id)
          return {
            ...res.data.data,
            submitted:
              res.data.data.form_submit_status === '已提交'
                ? 'success'
                : 'pending',
          };
        }
      })
      .then(resp => {
        if (resp) {
          fetchReport(resp.form_id, 'RoleTutor')
            .then(resp2 => {
              return {
                ...resp,
                teaApproved: resp2 && resp2.data.code === 0
                  ? resp2.data.data.pass
                    ? 'success'
                    : 'fail'
                  : 'pending',
              };
            })
            .then(resp3 => {
              if (resp3) {
                fetchReport(resp3.form_id, 'RoleStudentAffairsOffice').then(
                  resp4 => {
                    setCurrentStatus({
                      ...resp3,
                      officeApproved: resp4 && resp4.data.code === 0
                        ? resp4.data.data.pass
                          ? 'success'
                          : 'fail'
                        : 'pending',
                    } as curStatusType);
                  }
                );
              }
            });
        }
      });
  }
  useDidShow(() => {
    getInfo()
  });
  const handleSubmit = () => {
    const editable =
      currentStatus?.submitted === 'pending'
    Nav(`${submitPath}?formId=${formId}&editable=${editable}`);
  };
  const handleReset = () => {
    fetchWithdrawForm(currentStatus?.form_id || 0).then(res => {
      res &&
        res.data.code === 0 &&
        Taro.showToast({
          title: '撤回成功',
        }).then(() => {
          Taro.setStorageSync('form_info', '')
          getInfo()
        });
    });
  };
  const handleCounselor = () => {
    Nav(`${counselorPath}?formID=${currentStatus?.form_id}`);
  };
  const handleStudentAffair = () => {
    Nav(`${studentAffairPath}?formID=${currentStatus?.form_id}`);
  };
  const handleArchive = () => {
    fetchArchive(currentStatus?.form_id || 1).then((res) => {
      if(res && res.data.code === 0) {
        Taro.showToast({
          title: '归档成功，快去个人主页下载吧！',
          icon: 'none'
        }).then(() => Nav('/pages/student/personalInfo/personalInfo'))
      }
    })
  }

  return (
    <>
      <PageWrap
        className="application-wrap"
        hasNavbar
        topBarProps={{ pos: 'center', children: 'CCNU换宿申请' }}
      >
        <Image
          className="progress-bar"
          fadeIn
          src={progressBarImg}
        ></Image>
        <View className="task-wrap">
          <TaskELem state={currentStatus?.submitted}>
            <View className="task-desc">提交申请表</View>
            <View className="task-button-wrap task-special">
              <Button
                className="task-short-button"
                onClick={handleSubmit}
              >
                {currentStatus?.teaApproved !== 'pending' ? '修改' : '查看'}
              </Button>
              <Button
                className="task-short-button"
                disabled={currentStatus?.teaApproved !== 'pending' || currentStatus?.submitted === 'pending'}
                onClick={handleReset}
              >
                撤回
              </Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.teaApproved}>
            <View className="task-desc">培养单位意见</View>
            <View className="task-button-wrap">
              <Button
                className="task-long-button"
                disabled={currentStatus?.teaApproved === 'pending'}
                onClick={handleCounselor}
              >
                查看
              </Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.officeApproved}>
            <View className="task-desc">学工部审核</View>
            <View className="task-button-wrap">
              <Button
                className="task-long-button"
                disabled={currentStatus?.officeApproved === 'pending'}
                onClick={handleStudentAffair}
              >
                查看
              </Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.officeApproved}>
            <View className="task-desc">流程完毕</View>
            <View className="task-button-wrap">
              <Button
                className="task-long-button"
                disabled={currentStatus?.teaApproved !== 'fail' && currentStatus?.officeApproved !== 'success'}
                onClick={handleArchive}
              >
                归档
              </Button>
            </View>
          </TaskELem>
        </View>
      </PageWrap>
    </>
  );
};

export default Application;

export const TaskELem: React.FC<TaskElemProps> = props => {
  const { children, state } = props;
  return (
    <>
      <ContentFiled className="application-task-elem">
        {children}
        {state && (
          <Image src={imgMap[state]} fadeIn className="task-elem-state" />
        )}
        <View
          className="progress-stop-point"
          style={{ backgroundColor: state && colorMap[state] }}
        ></View>
      </ContentFiled>
    </>
  );
};
