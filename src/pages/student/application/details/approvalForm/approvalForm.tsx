import React, { useState } from "react";
import PageWrap from "@/components/pageWrap/pageWrap";
import Button from "@/components/button/button";
import academys from "./formInfo";
import {Text,ScrollView,View,Input,Picker, Textarea} from "@tarojs/components";
import './index.less'


const ApprovalForm: React.FC=()=>{
  const [stuName,setStuNmae]=useState('')
  const [stuNumber,setStuNumber]=useState('')
  const [selectedAcademy,setSelectedAcademy]=useState('')
  const [connection,setConnection]=useState('')
  const [instructor,setInstructor]=useState('')
  const [submitDate,setSubmitDate]=useState('')
    return(
        <PageWrap  topBarProps={{pos:'leftWithButton', children:'CCNU 换宿审批'}}>
          <ScrollView scrollY className='approvalForm-wrap'>
            <View className='approvalForm-wrap-content'>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>姓 名</Text>
                <Input className='approvalForm-item-Input' value={stuName} onInput={(e)=>setStuNmae(e.detail.value)}></Input>
              </View> 
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>学 号</Text>
                <Input className='approvalForm-item-Input' value={stuNumber} onInput={(e)=>setStuNumber(e.detail.value)}></Input>
              </View> 
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>学 院</Text>
                <Picker mode='selector' range={academys} onChange={(e)=>setSelectedAcademy(academys[e.detail.value])}>
                  <View className='approvalForm-item-Input'>
                    {selectedAcademy}
                  </View>
                </Picker>
              </View> 
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag smaller-tag'>联系方式</Text>
                <Input className='approvalForm-item-Input' value={connection} onInput={(e)=>setConnection(e.detail.value)}></Input>
              </View> 
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>辅导员</Text>
                <Input className='approvalForm-item-Input' value={instructor} onInput={(e)=>setInstructor(e.detail.value)}></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现楼栋号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调楼栋号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现寝室号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调寝室号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View> 
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现床位号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调床位号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>  
              <View className='form-textarea-intro'>个人申请</View>  
              <View className='form-textarea-intro'>（请阐明调寝原因）</View>  
              <Textarea id='changingReason' maxlength={500}></Textarea>   
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>申请人签字</Text>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>时间</Text>
                <Picker  mode='date' value={submitDate} onChange={(e)=>setSubmitDate(e.detail.value)}>
                  <View className='date-picker'>
                    <View  className='date-detail bigger-tag'>{submitDate.slice(0,4)}</View >年
                    <View  className='date-detail'>{submitDate.slice(5,7)}</View >月
                    <View  className='date-detail'>{submitDate.slice(8,10)}</View >日
                  </View>
                </Picker>
              </View>       
            </View>
          </ScrollView>
          <View className='formButtonbox'>
            <Button className='form-checking-button'>保存草稿</Button>
            <Button className='form-checking-button'>提交申请</Button>
          </View>
        </PageWrap>
    )
}
export default ApprovalForm;