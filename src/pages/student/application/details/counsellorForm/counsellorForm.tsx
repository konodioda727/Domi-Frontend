import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import {
  Input,
  Label,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Image,
  View,
} from '@tarojs/components';
import React, { useState } from 'react';
import './index.less';
import {fetchReport} from "@/services/fetch";
import Taro, {useDidShow} from "@tarojs/taro";
import {dateGene} from "@/utils/dateGene";

definePageConfig({
  disableScroll: true
})
const DepartmentForm: React.FC = () => {
  const [result, setResult] = useState<boolean>();
  const [counsellorAdvice, setCounsellorAdvice] = useState('');
  const [instructor, setInstructor] = useState('');
  const [handleDate, sethandleDate] = useState('');
  const [signature, setSignature] = useState<string>('')
  useDidShow(() => {
    const instance = Taro.getCurrentInstance();
    const formID = Number(instance.router!.params.formID as string)
    fetchReport(formID, 'RoleTutor').then((res) => {
       if(res) {
         setResult(res.data.data.pass)
         setCounsellorAdvice(res.data.data.detail || '辅导员未提供相关信息')
         setInstructor(res.data.data.reporter_name || '')
         setSignature(res.data.data.signature || '')
         sethandleDate(dateGene(res.data.data.ctime || ''))
       }
    })
  })
  return (
    <PageWrap topBarProps={{ pos: 'leftWithButton', children: '培养单位意见' }}>
      <ContentFiled className="CounsellorForm-wrap">
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">辅导员</Text>
          <Input
            disabled
            className="CounsellorForm-item-name"
            value={instructor}
          ></Input>
        </View>
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">是否同意调宿</Text>
          <RadioGroup>
            <Label className="checking-reslut-label">
              <Radio disabled value="yes" checked={result}></Radio>
              <Text>是</Text>
            </Label>
            <Label className="checking-reslut-label">
              <Radio disabled value="no" checked={!result}></Radio>
              <Text>否</Text>
            </Label>
          </RadioGroup>
        </View>
        <Textarea
          value={counsellorAdvice}
          maxlength={500}
          disabled
          className="DepartmentForm-item"
          id="counsellorAdvice"
        ></Textarea>
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">辅导员签字</Text>
          <Image src={signature} className="CounsellorForm-item-Input sigh-input" />
        </View>
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">时 间</Text>
          <Input
            disabled
            className="form-time"
            value={handleDate}
          ></Input>
        </View>
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">电子盖章</Text>
          <View className="CounsellorForm-stamp"></View>
        </View>
      </ContentFiled>
    </PageWrap>
  );
};
export default DepartmentForm;
