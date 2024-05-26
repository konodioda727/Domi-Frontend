import React, {useEffect, useState} from "react";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import {imgMap, colorMap, applicationNavConfigs, statusArr} from "@/configs/applicationConfig";
import {Nav} from "@/utils/nav";
import PageWrap from "@/components/pageWrap/pageWrap";
import {TaskElemProps} from "@/pages/student/application/applicationProps";
import {fetchProgress, fetchReport, fetchWithdrawForm} from "@/services/fetch";
import {Image, View} from "@tarojs/components";
import {formStatusType} from "@/services/fetchTypes";
import Taro from "@tarojs/taro";
import './application.less'

type curStatusTpye = formStatusType & {submitted: boolean, teaApproved: boolean, officeApproved: boolean}
const Application: React.FC = () => {
  const {counselorPath, studentAffairPath, submitPath} = applicationNavConfigs;
  const [currentStatus, setCurrentStatus] = useState<curStatusTpye>()
  useEffect(() => {
    fetchProgress().then((res) => {
      if(res && res.data.code === 0 ) {
        return {...res.data.data, submitted: res.data.data.form_submit_status === '已提交'}
      }
    }).then(resp => {
      if(resp) {
        fetchReport(resp.form_id, 'RoleTutor').then(resp2 => {
          return {...resp, teaApproved: resp2 && resp2.data.data.pass}
        }).then(resp3 => {
          if(resp3) {
            fetchReport(resp3.form_id, 'RoleStudentAffairsOffice').then(resp4 => {
              setCurrentStatus({...resp4, officeApproved:( resp4 && resp4.data.data.pass) as boolean} as curStatusTpye)
            })
          }
        })
      }
    })
  }, []);
  const handleSubmit = () => {
    Nav(submitPath)
  };
  const handleReset = () => {
    fetchWithdrawForm(currentStatus?.form_id || 0).then((res)=>{
      res && res.data.code === 0 && Taro.showToast({
        title: '撤回成功',
      }).then(() => {
        setCurrentStatus({...currentStatus, submitted: false} as curStatusTpye)
      })
    })
  };
  const handleCounselor = () => {
    Nav(counselorPath)
  };
  const handleStudentAffair = () => {
    Nav(studentAffairPath)
  };

  return (
    <>
      <PageWrap className='application-wrap' hasNavbar topBarProps={{pos:'center', children:'CCNU换宿申请'}}>
        <Image className='progress-bar' fadeIn src='https://s2.loli.net/2024/05/17/pM3L8sOhlnjCbgv.png'></Image>
        <View className='task-wrap'>
          <TaskELem state={currentStatus?.submitted ? 'success' : 'pending'}>
            <View className='task-desc'>提交申请表</View>
            <View className='task-button-wrap task-special'>
              <Button className='task-short-button' disabled={currentStatus?.form_submit_status as number > 0} onClick={handleSubmit}>修改</Button>
              <Button className='task-short-button' disabled={currentStatus?.form_submit_status as number > 1} onClick={handleReset}>撤回</Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.teaApproved ? 'success' : 'pending'}>
            <View className='task-desc'>培养单位意见</View>
            <View className='task-button-wrap'>
              <Button className='task-long-button' disabled={currentStatus?.form_submit_status as number <= 3} onClick={handleCounselor}>查看</Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.form_submit_status as number > 3 ? 'success' : 'pending'}>
            <View className='task-desc'>学工部审核</View>
            <View className='task-button-wrap'>
              <Button className='task-long-button' disabled={currentStatus?.form_submit_status as number <= 4} onClick={handleStudentAffair}>查看</Button>
            </View>
          </TaskELem>
          <TaskELem state={currentStatus?.form_submit_status as number > 4 ? 'success' : 'pending'}>
            <View className='task-desc'>请前往</View>
            <View className='task-desc'>“用户-换宿流程说明”</View>
            <View className='task-desc'>中查看</View>
          </TaskELem>
        </View>
      </PageWrap>
    </>
  )
}

export default Application

export const TaskELem: React.FC<TaskElemProps> = (props) => {
  const {children, state} = props;
  return (
    <>
      <ContentFiled className='application-task-elem'>
        {children}
        {state && <Image src={imgMap[state]} fadeIn className='task-elem-state' />}
        <View className='progress-stop-point' style={{backgroundColor: state && colorMap[state]}}></View>
      </ContentFiled>
    </>
  )
}
TaskELem.defaultProps = {
  state: 'pending'
}
