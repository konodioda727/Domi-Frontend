import Button from '@/components/button/button';
import { PickerItem } from '@/components/input/input';
import PageWrap from '@/components/pageWrap/pageWrap';
import {fetchFormDetail, fetchUploadForm} from '@/services/fetch';
import useQiniuUpload from "@/utils/useQiniuUpload";
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
import academys from './formInfo';
import './index.less';
import MultiColumnPicker from "@/pages/student/application/details/approvalForm/components/picker/multiColumnPicker";

const handleInput = (
  tag: keyof applicationType | string[],
  e: any,
  formInfo = Taro.getStorageSync('form_info') || {}
) => {
  const content = typeof e === 'string' ? e : (e.target.value as string);
  if (tag instanceof Array) {
    formInfo[tag[0]] === undefined
      ? (formInfo[tag[0]] = { [tag[1]]: content })
      : (formInfo[tag[0]][tag[1]] = content);
  } else {
    formInfo[tag] = content;
  }
  Taro.setStorageSync('form_info', formInfo);
  console.log(formInfo)
};
const ApproveInput: React.FC<{
  name: keyof applicationType;
  subName?: string;
  disable?: boolean;
  defaultValue?: string ;
}> = ({ name, subName, disable, defaultValue }) => {
  const formInfo = Taro.getStorageSync('form_info');
  const curInfo = formInfo[name] || '';
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    setValue(defaultValue || (subName && curInfo ? curInfo[subName] : curInfo))
  }, [defaultValue]);
  return (
    <>
      <Input
        className={`approvalForm-item-Input ${disable && 'input-disable'}`}
        value={value}
        disabled={disable}
        onInput={e => {
          setValue(e.detail.value)
          handleInput(subName ? [name as string, subName] : name, e)
        }}
      ></Input>
    </>
  );
};
const ApprovalForm: React.FC = () => {
  const { college } = Taro.getStorageSync(
    'form_info'
  ) as applicationType;
  const [selectedAcademy, setSelectedAcademy] = useState(
    college || ' 计算机学院'
  );
  const [ownerSignUrl, setOwnerSignUrl] = useState('');
  const [fecthedData, setFecthedData] = useState<applicationType>()
  useDidShow(() => {
    const instance = Taro.getCurrentInstance();
    const formId = Number(instance.router!.params.formId as string)
    const submitted = instance.router!.params.submitted === 'success'
    if(submitted) {
      fetchFormDetail(formId).then(res => {
        if(res && res.data.code === 0) {
          Taro.setStorageSync('form_info', {...Taro.getStorageSync('form_info'), ...res.data.data})
          setFecthedData(res.data.data)
        }
      })
    }
  })
  useEffect(() => {
    console.log(ownerSignUrl)
    if (ownerSignUrl) {
      useQiniuUpload(ownerSignUrl).then(e=>console.log(e))
    }
  }, [ownerSignUrl]);
  const handleSelect = (e: any) => {
    const tmp_college = academys[e.target.value];
    handleInput('college', e);
    handleSave();
    setSelectedAcademy(tmp_college);
  };
  const handleSubmit = () => {
    const param = Taro.getStorageSync('form_info') as applicationType;
    fetchUploadForm({...param, signature: ownerSignUrl}).then(res => {
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
    handleSubmit()
    Taro.showToast({
      title: '保存成功',
      icon: 'success',
    });
  };
  // 拉起签名页
  const jumpToSign = () => {
    const eventKey = `${new Date().getTime()}`;
    Taro.eventCenter.once(eventKey, data => {
      setOwnerSignUrl(data.url);
    });
  Nav(`/pages/sharing/signPage/signPage?type=${eventKey}`)
  };
  return (
    <PageWrap
      topBarProps={{ pos: 'leftWithButton', children: 'CCNU 换宿审批' }}
    >
      <ScrollView scrollY className="approvalForm-wrap">
        <View className="approvalForm-wrap-content">
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">姓 名</Text>
            <ApproveInput name="name" disable></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 号</Text>
            <ApproveInput name="student_id" disable></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 院</Text>
            <PickerItem
              classNames="approvalForm-item-Input"
              selected={selectedAcademy}
              disable
              defaultValue={academys.indexOf(selectedAcademy || ' 计算机学院')}
              range={academys}
              handleSelect={handleSelect}
            ></PickerItem>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag smaller-tag">联系方式</Text>
            <ApproveInput defaultValue={fecthedData?.phone} name="phone"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">辅导员</Text>
            <ApproveInput defaultValue={fecthedData?.tutor} name="tutor"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">现居寝室号</Text>
            <MultiColumnPicker loc={{building: '南湖8栋', bed:'1', room: '121', area: '南湖'}}></MultiColumnPicker>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">拟调寝室号</Text>
            <MultiColumnPicker loc={{building: '南湖8栋', bed:'1', room: '121', area: '南湖'}}></MultiColumnPicker>
          </View>
          <View className="form-textarea-intro">个人申请</View>
          <View className="form-textarea-intro">（请阐明调寝原因）</View>
          <Textarea
            id="changingReason"
            defaultValue={fecthedData?.reason}
            onInput={e => handleInput('reason', e)}
            maxlength={500}
          ></Textarea>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">申请人签字</Text>
            <View style={{paddingLeft: 0}} className="approvalForm-item-Input smaller-input">
              {fecthedData?.signature || ownerSignUrl ? (
                <Image
                  className="smaller-input"
                  src={ownerSignUrl}
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
        <Button className="form-checking-button" onClick={handleSave}>
          保存草稿
        </Button>
        <Button className="form-checking-button" onClick={handleSubmit}>
          提交申请
        </Button>
      </View>
    </PageWrap>
  );
};
export default ApprovalForm;
