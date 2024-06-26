import Button from '@/components/button/button';
import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import {fetchFormDetail, fetchGetMyInfo, fetchReport, fetchReview, fetchUploadToQiniu} from '@/services/fetch';
import { reportType, reviewType} from '@/services/fetchTypes';
import {Back, Nav} from '@/utils/nav';
import {
  Image,
  Label,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  View,
} from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, {useEffect, useState} from 'react';
import './index.less';

definePageConfig({
  disableScroll: true
})
const TeacherChecking: React.FC = () => {
  const [formID, setFormID] = useState<number>(0);
  // 签名图片的 临时路径
  const [ownerSignUrl, setOwnerSignUrl] = useState('');
  const [judged, setJudged] = useState<null | reportType>(null)
  const [signLink, setSignLink] = useState<string>('')
  const [result, setResult] = useState<boolean>();
  const [checkingReason, setCheckingReason] = useState('');
  const [applicationInfo, setApplicationInfo] = useState<string>('');

  // 拉起签名页
  useEffect(() => {
    if (ownerSignUrl) {
      fetchUploadToQiniu(ownerSignUrl).then((e: string)=>{
       setSignLink(e)
        Taro.showToast({
          title: '签名上传成功'
        })
      })
    }
  }, [ownerSignUrl]);
  const jumpToSign = () => {
    if(judged === null) {
      const eventKey = `${new Date().getTime()}`;
      Taro.eventCenter.once(eventKey, data => {
        setOwnerSignUrl(data.url);
      });
      Nav(`/pages/sharing/signPage/signPage?type=${eventKey}`)
    }
  };
  useDidShow(() => {
    // 这个是可以拿到当前的app实例 page实例 和router
    const instance = Taro.getCurrentInstance();
    const formID = Number(instance.router!.params.formID as string)
    fetchFormDetail(formID).then((res) => {
      res && setApplicationInfo(res.data.data.reason || '未提供相应信息')
      setFormID(formID);
    }).then(() => {
      fetchGetMyInfo().then((res) => {
        if(res && res.data.code === 0) {
          fetchReport(formID, res.data.data.role).then((resp) => {
            if(resp && resp.data.code === 0) {
              setJudged(resp.data.data)
              setResult(resp.data.data.pass || false)
            }
          })
        }
      } )
    })
  });
 const handleClick = () => {
    const reviewInfo: reviewType = {
      pass: result,
      detail: checkingReason,
      signature: signLink,
      stamp: '',
      form_id: formID,
    };
    if(checkingReason && signLink && formID) {
      fetchReview(reviewInfo).then(res => {
        if (res && res.data.code === 0) {
          Taro.showToast({
            title: '提交成功',
          }).then(() => Back());
        }
      });
    } else {
      Taro.showToast({
        title: '请填完所有信息后提交！',
        icon: 'none'
      })
    }

  };
  return (
    <>
      <PageWrap topBarProps={{ pos: 'centerWithButton', children: '申请详情' }}>
        <ContentFiled className="TeacherChecking-wrap">
          <View className="TeacherChecking-item-tag">申请信息</View>
          <Textarea
            value={applicationInfo}
            onInput={e => setApplicationInfo(e.detail.value)}
            maxlength={500}
            disabled
            className="TeacherChecking-item"
            id="applicationInfo"
          ></Textarea>
          <View className="TeacherChecking-item-tag">您的意见</View>
          <View className="TeacherChecking-item">
            <Text className="TeacherChecking-item-tag smaller_tag">
              是否同意调宿
            </Text>
            <RadioGroup>
              <Label className="checking-reslut-label">
                <Radio value="yes" disabled={ judged !== null } checked={result} onClick={() => setResult(true)}></Radio>
                <Text>是</Text>
              </Label>
              <Label className="checking-reslut-label">
                <Radio value="no" disabled={judged !== null} checked={!result} onClick={() => setResult(false)}></Radio>
                <Text>否</Text>
              </Label>
            </RadioGroup>
          </View>
          <View className="TeacherChecking-item">
            <View className="reason_detail">
              <Text className="TeacherChecking-item-tag smaller_tag">
                {'您的意见 \n(已了解需求同意 或不同意的原因)'}
              </Text>
            </View>
            <Textarea
              value={judged?.detail || checkingReason}
              onInput={e => setCheckingReason(e.detail.value)}
              className="TeacherChecking-item-Input"
              disabled={judged !== null}
              id="checkingReason"
            ></Textarea>
          </View>
          <View className="TeacherChecking-item">
            <Text className="TeacherChecking-item-tag">负责人签字</Text>
            {!signLink && !judged?.signature
              ? <Button className='teacher-sign' onClick={jumpToSign}>点击签字</Button>
              : <Image src={judged?.signature || signLink || ''} onClick={jumpToSign} className='teacher-sign teacher-img'></Image>
            }
          </View>
          <View className="TeacherChecking-item">
            <View className="TeacherChecking-stamp"></View>
            <Button onClick={handleClick} disabled={judged !== null} className="teacher-confirm">
              {!judged ? '确认' : '已审核'}
            </Button>
          </View>
        </ContentFiled>
      </PageWrap>
    </>
  );
};
export default TeacherChecking;
