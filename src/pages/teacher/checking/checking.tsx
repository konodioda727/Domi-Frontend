import React, {useEffect, useState} from "react";
import ContentFiled from "@/components/contentField/contentFiled";
import Taro, {useDidShow} from "@tarojs/taro";
import PageWrap from "@/components/pageWrap/pageWrap";
import { Textarea, View,Text, RadioGroup, Radio, Label } from "@tarojs/components";
import {reviewType} from "@/services/fetchTypes";
import {fetchReview} from "@/services/fetch";
import {Back} from "@/utils/nav";
import Button from "@/components/button/button";
import './index.less'

const TeacherChecking: React.FC=()=>{
  const [formID, setFormID] = useState<number>(0)
    // 签名图片的 临时路径
    const [ownerSignUrl, setOwnerSignUrl] = useState('');

    // 拉起签名页
    const jumpToSign = () => {
      const eventKey = `${new Date().getTime()}`
      Taro.eventCenter.once(eventKey, data => {
        setOwnerSignUrl(data.url)
      })
      Taro.navigateTo({ url: `/pages/sharing/signPage/signPage?type=${eventKey}` });
    }
  useDidShow(() => {
    // 这个是可以拿到当前的app实例 page实例 和router
    const instance = Taro.getCurrentInstance();
    setFormID(Number(instance.router!.params.formID as string))
  });
  useEffect(()=>{
    setResult(true);
    setCheckingReason('')
    },[])
    const [result,setResult]=useState<boolean>()
    // const [applicationInfo,setapplicationInfo]=useState('')
    const [checkingReason,setCheckingReason]=useState('')
  const handleClick = () => {
    const reviewInfo: reviewType = {
      pass: result,
      detail: checkingReason,
      signature: '',
      stamp: '',
      form_id: formID
    }
    fetchReview(reviewInfo).then((res) => {
      if(res && res.data.code === 0) {
        Taro.showToast({
          title: '提交成功'
        }).then(() => Back())
      }
    })
  }
return(
    <>
    <PageWrap  topBarProps={{pos:'centerWithButton', children:'申请详情'}}>
        <ContentFiled className='TeacherChecking-wrap'>
            {/*<View className='TeacherChecking-item-tag'>申请信息</View>*/}
            {/*<Textarea value={applicationInfo} onInput={(e)=>setapplicationInfo(e.detail.value)} maxlength={500} disabled className='TeacherChecking-item' id='applicationInfo'></Textarea >*/}
            {/*<View className='TeacherChecking-item-tag'>您的意见</View>*/}
            <View className='TeacherChecking-item'>
                <Text className='TeacherChecking-item-tag smaller_tag'>是否同意调宿</Text>
               <RadioGroup>
                    <Label className='checking-reslut-label'>
                       <Radio  value='yes' checked={result}></Radio><Text>是</Text>
                    </Label>
                    <Label className='checking-reslut-label'>
                        <Radio  value='no'  checked={result==false}></Radio><Text>否</Text>
                    </Label>
               </RadioGroup>
            </View>
            <View className='TeacherChecking-item'>
                <View className='reason_detail'>
                    <Text className='TeacherChecking-item-tag smaller_tag'>辅导员意见</Text>
                    <Text className='TeacherChecking-item-tag smaller_tag'>（已了解需求同意</Text>
                    <Text className='TeacherChecking-item-tag smaller_tag'>或不同意的原因）</Text>
                </View>
                <Textarea value={checkingReason} onInput={(e)=>setCheckingReason(e.detail.value)} className='TeacherChecking-item-Input' id='checkingReason'></Textarea>
            </View>
            <View className='TeacherChecking-item'>
                <Text className='TeacherChecking-item-tag'>负责人签字</Text>
            </View>
            <View className='TeacherChecking-item'>
                <View className='TeacherChecking-stamp'></View>
            </View>
          <Button onClick={handleClick} className='teacher-confirm'>提交审核</Button>
        </ContentFiled>
    </PageWrap>
            </>
)
}
export default TeacherChecking;
