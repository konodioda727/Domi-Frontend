import React, {useState} from "react";
import PageWrap from "@/components/pageWrap/pageWrap";
import Button from "@/components/button/button";
import Taro from "@tarojs/taro";
import {Text,ScrollView,View,Input,Picker, Textarea ,Image} from "@tarojs/components";
import {PersonalInfoResponseType, uploadFormType} from "@/services/fetchTypes";
import {fetchUploadForm} from "@/services/fetch";
import {Back} from "@/utils/nav";
import academys from "./formInfo";
import './index.less'

type formtype = uploadFormType & {name: string} & PersonalInfoResponseType

const handleInput = (tag: keyof formtype , e: any, formInfo = Taro.getStorageSync('form_info') || {}) => {
  formInfo[tag] = typeof e === 'string' ? e : e.target.value as string;
  Taro.setStorageSync('form_info', formInfo)
}
const ApproveInput: React.FC<{name: keyof uploadFormType}> = ({name}) => {
  const formInfo = Taro.getStorageSync('form_info')
  return (
    <>
      <Input className='approvalForm-item-Input' defaultValue={formInfo[name]} onInput={(e)=>handleInput(name, e)}></Input>
    </>
  )

}
const ApprovalForm: React.FC=()=>{
  const {college, context, create_at} = Taro.getStorageSync('form_info') as formtype
 const [selectedAcademy,setSelectedAcademy]=useState(college || ' 计算机学院')
  const [submitDate,setSubmitDate]=useState(create_at || '')
  // 签名图片的 临时路径
  const [ownerSignUrl, setOwnerSignUrl] = useState('');

  const handleSelect = (e: any) => {
    const tmp_college = academys[e.target.value]
    handleInput("college", e)
    handleSave()
    setSelectedAcademy(tmp_college)
  }
 const handleSubmit = () => {
    const param = Taro.getStorageSync('form_info') as formtype
    param.student_id = param.ccnuid
    fetchUploadForm(param).then((res) => {
      res && res.code < 300
        ? Back().then(() => {
          Taro.showToast({
            icon: 'success',
            title: '提交成功',
          })
        })
        : Taro.showToast({
            title: '提交失败',
            icon: 'error'
        })
    })
 }
 const handleDate = (e: any) => {
    const tmp_create_at = e.detail.value as string
   handleInput('create_at', e)
   setSubmitDate(tmp_create_at)
 }
 const handleSave = () => {
   Taro.showToast({
     title: '保存成功',
     icon: 'success'
   })
 }
  // 拉起签名页
  const jumpToSign = () => {
    const eventKey = `${new Date().getTime()}`
    Taro.eventCenter.once(eventKey, data => {
      setOwnerSignUrl(data.url)
    })

    Taro.navigateTo({ url: `/pages/sharing/signPage/signPage?type=${eventKey}` });
  }
  return(
    <PageWrap  topBarProps={{pos:'leftWithButton', children:'CCNU 换宿审批'}}>
      <ScrollView scrollY className='approvalForm-wrap'>
        <View className='approvalForm-wrap-content'>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag'>姓 名</Text>
            <ApproveInput name='name'></ApproveInput>
           </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag'>学 号</Text>
            <ApproveInput name='ccnuid'></ApproveInput>
           </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag'>学 院</Text>
            <Picker mode='selector' defaultValue={academys.indexOf(selectedAcademy || " 计算机学院" )} range={academys} onChange={handleSelect}>
              <View className='approvalForm-item-Input'>
                {selectedAcademy}
              </View>
            </Picker>
          </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag smaller-tag'>联系方式</Text>
            <ApproveInput name='contact'></ApproveInput>
           </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag'>辅导员</Text>
            <ApproveInput name='teacher_id'></ApproveInput>
          </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag bigger-tag'>现楼栋号</Text>
            <Text className='approvalForm-item-tag bigger-tag'>拟调楼栋号</Text>
          </View>
          <View className='approvalForm-item'>
            <ApproveInput name='from_dorm'></ApproveInput>
            <ApproveInput name='to_dorm'></ApproveInput>
          </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag bigger-tag'>现寝室号</Text>
            <Text className='approvalForm-item-tag bigger-tag'>拟调寝室号</Text>
          </View>
          <View className='approvalForm-item'>
            <ApproveInput name='from_bed'></ApproveInput>
            <ApproveInput name='to_bed'></ApproveInput>
          </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag bigger-tag'>现床位号</Text>
            <Text className='approvalForm-item-tag bigger-tag'>拟调床位号</Text>
          </View>
          <View className='approvalForm-item'>
            <ApproveInput name='from_bed'></ApproveInput>
            <ApproveInput name='to_bed'></ApproveInput>
           </View>
          <View className='form-textarea-intro'>个人申请</View>
          <View className='form-textarea-intro'>（请阐明调寝原因）</View>
          <Textarea id='changingReason' defaultValue={context} onInput={(e) => handleInput('context', e)} maxlength={500}></Textarea>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag bigger-tag'>申请人签字</Text>
            <View className='approvalForm-item-Input smaller-input'>
              {ownerSignUrl
                ? <Image className='smaller-input' src={ownerSignUrl} onClick={() => jumpToSign()} />
                : <View  className='smaller-input' onClick={() => jumpToSign()}>点击签名</View>
              }
            </View>
          </View>
          <View className='approvalForm-item'>
            <Text className='approvalForm-item-tag'>时间</Text>
            <Picker  mode='date' value={submitDate} onChange={(e)=>handleDate(e)}>
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
        <Button className='form-checking-button' onClick={handleSave}>保存草稿</Button>
        <Button className='form-checking-button' onClick={handleSubmit}>提交申请</Button>
      </View>
    </PageWrap>
  )
}
export default ApprovalForm;
