import Button from '@/components/button/button';
import { PickerItem } from '@/components/input/input';
import PageWrap from '@/components/pageWrap/pageWrap';
import { fetchUploadForm } from '@/services/fetch';
import { applicationType } from '@/services/fetchTypes';
import { Back } from '@/utils/nav';
import {
  Image,
  Input,
  ScrollView,
  Text,
  Textarea,
  View,
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import academys from './formInfo';
import './index.less';

const handleInput = (
  tag: keyof applicationType | string[],
  e: any,
  formInfo = Taro.getStorageSync('form_info') || {}
) => {
  const content = typeof e === 'string' ? e : (e.target.value as string);
  if (tag instanceof Array) {
    console.log(tag);
    formInfo[tag[0]] === undefined
      ? (formInfo[tag[0]] = { [tag[1]]: content })
      : (formInfo[tag[0]][tag[1]] = content);
  } else {
    formInfo[tag] = content;
  }
  Taro.setStorageSync('form_info', formInfo);
};
const ApproveInput: React.FC<{
  name: keyof applicationType;
  subName?: string;
}> = ({ name, subName }) => {
  const formInfo = Taro.getStorageSync('form_info');
  const curInfo = formInfo[name] || '';
  return (
    <>
      <Input
        className="approvalForm-item-Input"
        defaultValue={subName && curInfo ? curInfo[subName] : curInfo}
        onInput={e =>
          handleInput(subName ? [name as string, subName] : name, e)
        }
      ></Input>
    </>
  );
};
const ApprovalForm: React.FC = () => {
  const { college, context } = Taro.getStorageSync(
    'form_info'
  ) as applicationType;
  const [selectedAcademy, setSelectedAcademy] = useState(
    college || ' 计算机学院'
  );
  const [ownerSignUrl, setOwnerSignUrl] = useState('');

  const handleSelect = (e: any) => {
    const tmp_college = academys[e.target.value];
    handleInput('college', e);
    handleSave();
    setSelectedAcademy(tmp_college);
  };
  const handleSubmit = () => {
    const param = Taro.getStorageSync('form_info') as applicationType;
    param.student_id = param.ccnuid;
    fetchUploadForm(param).then(res => {
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

    Taro.navigateTo({
      url: `/pages/sharing/signPage/signPage?type=${eventKey}`,
    });
  };
  return (
    <PageWrap
      topBarProps={{ pos: 'leftWithButton', children: 'CCNU 换宿审批' }}
    >
      <ScrollView scrollY className="approvalForm-wrap">
        <View className="approvalForm-wrap-content">
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">姓 名</Text>
            <ApproveInput name="name"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 号</Text>
            <ApproveInput name="student_id"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">学 院</Text>
            <PickerItem
              classNames="approvalForm-item-Input"
              selected={selectedAcademy}
              defaultValue={academys.indexOf(selectedAcademy || ' 计算机学院')}
              range={academys}
              handleSelect={handleSelect}
            ></PickerItem>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag smaller-tag">联系方式</Text>
            <ApproveInput name="phone"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag">辅导员</Text>
            <ApproveInput name="tutor"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">现楼栋号</Text>
            <Text className="approvalForm-item-tag bigger-tag">拟调楼栋号</Text>
          </View>
          <View className="approvalForm-item">
            <ApproveInput name="src_location" subName="building"></ApproveInput>
            <ApproveInput name="dst_location" subName="building"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">现寝室号</Text>
            <Text className="approvalForm-item-tag bigger-tag">拟调寝室号</Text>
          </View>
          <View className="approvalForm-item">
            <ApproveInput name="src_location" subName="room"></ApproveInput>
            <ApproveInput name="dst_location" subName="room"></ApproveInput>
          </View>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">现床位号</Text>
            <Text className="approvalForm-item-tag bigger-tag">拟调床位号</Text>
          </View>
          <View className="approvalForm-item">
            <ApproveInput name="src_location" subName="bed"></ApproveInput>
            <ApproveInput name="dst_location" subName="bed"></ApproveInput>
          </View>
          <View className="form-textarea-intro">个人申请</View>
          <View className="form-textarea-intro">（请阐明调寝原因）</View>
          <Textarea
            id="changingReason"
            defaultValue={context}
            onInput={e => handleInput('reason', e)}
            maxlength={500}
          ></Textarea>
          <View className="approvalForm-item">
            <Text className="approvalForm-item-tag bigger-tag">申请人签字</Text>
            <View className="approvalForm-item-Input smaller-input">
              {ownerSignUrl ? (
                <Image
                  className="smaller-input"
                  src={ownerSignUrl}
                  onClick={() => jumpToSign()}
                />
              ) : (
                <View className="smaller-input" onClick={() => jumpToSign()}>
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
