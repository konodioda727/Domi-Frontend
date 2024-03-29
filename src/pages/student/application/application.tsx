import React from "react";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import {imgMap, colorMap, applicationNavConfigs} from "@/configs/applicationConfig";
import {Nav} from "@/utils/nav";
import PageWrap from "@/components/pageWrap/pageWrap";
import {TaskElemProps} from "@/pages/student/application/applicationProps";
import {Image, View} from "@tarojs/components";
import './application.less'

const Application: React.FC = () => {
  const {counselorPath, studentAffairPath, submitPath, editPath} = applicationNavConfigs;
  const handleSubmit = () => {
    Nav(submitPath)
  };
  const handleEdit = () => {
    Nav(editPath)
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
        <Image className='progress-bar' src='https://i2.100024.xyz/2024/02/01/12wc896.webp'></Image>
        <View className='task-wrap'>
          <TaskELem>
            <View className='task-desc'>提交申请表</View>
            <View className='task-button-wrap task-special'>
              <Button className='task-short-button' onClick={handleSubmit}>提交</Button>
              <Button className='task-short-button' disabled onClick={handleEdit}>修改</Button>
            </View>
          </TaskELem>
          <TaskELem>
            <View className='task-desc'>培养单位意见</View>
            <View className='task-button-wrap'>
              <Button className='task-long-button' onClick={handleCounselor}>查看</Button>
            </View>
          </TaskELem>
          <TaskELem>
            <View className='task-desc'>学工部审核</View>
            <View className='task-button-wrap'>
              <Button className='task-long-button' onClick={handleStudentAffair}>查看</Button>
            </View>
          </TaskELem>
          <TaskELem>
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
        {state && <Image src={imgMap[state]} className='task-elem-state' />}
        <View className='progress-stop-point' style={{backgroundColor: state && colorMap[state]}}></View>
      </ContentFiled>
    </>
  )
}
TaskELem.defaultProps = {
  state: 'pending'
}
