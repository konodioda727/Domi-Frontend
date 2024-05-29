import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import {
  Image,
  Input,
  Label,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  View,
} from '@tarojs/components';
import React, { useState } from 'react';
import './index.less';
import Taro, {useDidShow} from "@tarojs/taro";
import {fetchReport} from "@/services/fetch";

const DepartmentForm: React.FC = () => {
  const [result, setResult] = useState<boolean>();
  const [counsellorAdvice, setCounsellorAdvice] = useState('');
  const [charger, setCharger] = useState('');
  const [signature, setSignature] = useState<string>('')
  const [handleDate, sethandleDate] = useState('');
  useDidShow(() => {
    const instance = Taro.getCurrentInstance();
    const formID = Number(instance.router!.params.formID as string)
    fetchReport(formID, 'RoleStudentAffairsOffice').then((res) => {
      if(res) {
        setResult(res.data.data.pass)
        setCounsellorAdvice(res.data.data.detail || '负责人未提供相关信息')
        setSignature(res.data.data.signature || '')
        setCharger(res.data.data.reporter_name || '')
        sethandleDate(new Date(res.data.data.ctime || '').toLocaleDateString())
      }
    })
  })
  return (
    <PageWrap topBarProps={{ pos: 'leftWithButton', children: '学工部审核' }}>
      <ContentFiled className="DepartmentForm-wrap">
        <View className="DepartmentForm-item">
          <Text className="DepartmentForm-item-tag">负责人</Text>
          <Input
            disabled
            className="DepartmentForm-item-Input"
            value={charger}
          ></Input>
        </View>
        <View className="DepartmentForm-item">
          <Text className="DepartmentForm-item-tag">是否同意调宿</Text>
          <RadioGroup>
            <Label className="checking-reslut-label">
              <Radio disabled value="yes" checked={result}></Radio>
              <Text>是</Text>
            </Label>
            <Label className="checking-reslut-label">
              <Radio disabled value="no" checked={result == false}></Radio>
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
        <View className="DepartmentForm-item">
          <Text className="DepartmentForm-item-tag">负责人签字</Text>
          <Image src={signature} className='DepartmentForm-item-Input sigh-input'></Image>
        </View>
        <View className="DepartmentForm-item">
          <Text className="DepartmentForm-item-tag">时 间</Text>
          <Input
            disabled
            className="DepartmentForm-item-Input "
            value={handleDate}
          ></Input>
        </View>
        <View className="DepartmentForm-item">
          <Text className="DepartmentForm-item-tag">电子盖章</Text>
          <View className="DepartmentForm-stamp"></View>
        </View>
      </ContentFiled>
    </PageWrap>
  );
};
export default DepartmentForm;
