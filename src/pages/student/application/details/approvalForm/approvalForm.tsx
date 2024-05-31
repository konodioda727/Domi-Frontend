import Button from '@/components/button/button';
import { PickerItem } from '@/components/input/input';
import PageWrap from '@/components/pageWrap/pageWrap';
import {fetchFormDetail, fetchUploadForm, fetchUploadToQiniu} from '@/services/fetch';
import { applicationType } from '@/services/fetchTypes';
import {Back, Nav} from '@/utils/nav';
import {
  Image,
  Input,
  ScrollView,
  Text,
  Textarea,
  View,
} from '@tarojs/components';
import Taro, {useDidShow} from '@tarojs/taro';
import React, {useEffect, useState} from 'react';
import academys, {building2AreRuleSet} from './formInfo';
import './index.less';
import MultiColumnPicker from "@/pages/student/application/details/approvalForm/components/picker/multiColumnPicker";

definePageConfig({
  disableScroll: true
})
const handleInput = (
  tag: keyof applicationType,
  e: any,
  formInfo = Taro.getStorageSync('form_info') || {}
) => {
  formInfo[tag] = e;
  Taro.setStorageSync('form_info', formInfo);
};
const ApproveInput: React.FC<{
  disable?: boolean;
  name: string | undefined;
  val: string | undefined;
  setVal: (name: string, value: string) => void;
}> = ({ disable, val, name, setVal }) => {
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    setValue(val as string)
  }, [val]);
  return (
    <>
      <Input
        className={`approvalForm-item-Input ${disable && 'input-disable'}`}
        value={value}
        disabled={disable}
        onInput={e => {
          setValue(e.detail.value)
          setVal(name || '_', e.detail.value)
        }}
      ></Input>
    </>
  );
};
const ApprovalForm: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [ownerSignUrl, setOwnerSignUrl] = useState('');
  const [fecthedData, setFecthedData] = useState<applicationType>()
  const renewData = (name: string, value: any) => {
    setFecthedData({...fecthedData, [name]: value})
    handleInput(name, value)
  }
  useDidShow(() => {
    const instance = Taro.getCurrentInstance();
    const formId = Number(instance.router!.params.formId as string)
    const editable = instance.router!.params.editable  === 'true'
    setIsEditable(editable)
    setFecthedData(Taro.getStorageSync('form_info'))
    if(!editable) {
      fetchFormDetail(formId).then(res => {
        if(res && res.data.code === 0) {
          setFecthedData(res.data.data)
        }
        Taro.showToast({
          title: '申请表已提交，文件只读',
          icon: 'none'
        })
      })
    }
  })
  useEffect(() => {
    if (ownerSignUrl) {
      fetchUploadToQiniu(ownerSignUrl).then((e: string)=>{
        renewData('signature',e)
        Taro.showToast({
          title: '签名上传成功'
        })
      })
    }
  }, [ownerSignUrl]);
  const handleSelect = (e: any) => {
    const tmp_college = academys[e.target.value];
    renewData('school', tmp_college);
  };
  const handleSrcPick = (e) => {
    console.log('src_pick',e)
    renewData('src_location', {
      building: e[1],
      room: e[2],
      bed: e[3].toString()
    })
  }
  const handleDstPick = (e) => {
    renewData('dst_location', {
      building: e[1],
      room: e[2],
      bed: e[3].toString()
    })
  }
  const handleSubmit = () => {
    const param = fecthedData as applicationType
    fetchUploadForm({...param}).then(res => {
      res && res.data.code === 0
        ? Back().then(() => {
            Taro.showToast({
              icon: 'success',
              title: '提交成功',
            });
          })
        : Taro.showToast({
            title: '提交失败',
            icon: 'error',
          });
    });
  };
  const handleSave = () => {
    Taro.setStorageSync('form_info', fecthedData)
    Taro.showToast({
      title: '保存成功',
      icon: 'success',
    });
  };
  // 拉起签名页
  const jumpToSign = () => {
    if(isEditable) {
      const eventKey = `${new Date().getTime()}`;
      Taro.eventCenter.once(eventKey, data => {
        setOwnerSignUrl(data.url);
      });
      Nav(`/pages/sharing/signPage/signPage?type=${eventKey}`)
    }
  };
  return (
    <PageWrap
      topBarProps={{ pos: 'leftWithButton', children: 'CCNU 换宿审批' }}
    >
      <ScrollView scrollY className="approvalForm-wrap">
        <View className="approvalForm-wrap-content">
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">姓 名</Text>
            <ApproveInput name='name' val={fecthedData?.name} setVal={renewData} disable></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 号</Text>
            <ApproveInput name='student_id' val={fecthedData?.student_id} setVal={renewData} disable></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 院</Text>
            <PickerItem
              classNames="approvalForm-item-Input"
              disable
              selected={fecthedData?.school || academys[0]}
              defaultValue={academys.indexOf(fecthedData?.school || academys[0])}
              range={academys}
              handleSelect={handleSelect}
            ></PickerItem>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag ">联系方式</Text>
            <ApproveInput disable={!isEditable} setVal={renewData} val={fecthedData?.phone} name="phone"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">辅导员</Text>
            <ApproveInput disable={!isEditable} setVal={renewData} val={fecthedData?.tutor} name="tutor"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag ">现居寝室</Text>
            <MultiColumnPicker disable={!isEditable} onPick={handleSrcPick} loc={{building: fecthedData?.src_location?.building, bed:fecthedData?.src_location?.bed, room: fecthedData?.src_location?.room, area: building2AreRuleSet(fecthedData?.src_location?.building as string) || '西区'}}></MultiColumnPicker>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag ">拟调寝室</Text>
            <MultiColumnPicker disable={!isEditable} onPick={handleDstPick} loc={{building: fecthedData?.dst_location?.building, bed:fecthedData?.dst_location?.bed, room: fecthedData?.dst_location?.room, area: building2AreRuleSet(fecthedData?.dst_location?.building as string) || '西区'}}></MultiColumnPicker>
          </View>
          <View className="form-textarea-intro">个人申请</View>
          <View className="form-textarea-intro">（请阐明调寝原因）</View>
          <Textarea
            id="changingReason"
            value={fecthedData?.reason}
            onInput={e => renewData('reason', e.detail.value as string)}
            maxlength={500}
            disabled={!isEditable}
          ></Textarea>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">申请人签字</Text>
            <View style={{paddingLeft: 0}} className="approvalForm-item-Input smaller-input">
              {fecthedData?.signature ? (
                <Image
                  className="smaller-input"
                  onClick={jumpToSign}
                  src={fecthedData?.signature}
                />
              ) : (
                <View  onClick={() => jumpToSign()}>
                  点击签名
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="formButtonbox">
        <Button className="form-checking-button" disabled={!isEditable} onClick={handleSave}>
          保存草稿
        </Button>
        <Button className="form-checking-button" onClick={handleSubmit} disabled={!isEditable}>
          提交申请
        </Button>
      </View>
    </PageWrap>
  );
};
export default ApprovalForm;
