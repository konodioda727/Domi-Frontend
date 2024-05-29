import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import {
  Input,
  Label,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  View,
} from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import './index.less';

const DepartmentForm: React.FC = () => {
  useEffect(() => {
    setResult(true);
    setCounsellorAdvice('');
    setInstructor('');
    sethandleDate('');
  }, []);
  const [result, setResult] = useState<boolean>();
  const [counsellorAdvice, setCounsellorAdvice] = useState('');
  const [instructor, setInstructor] = useState('');
  const [handleDate, sethandleDate] = useState('');
  return (
    <PageWrap topBarProps={{ pos: 'leftWithButton', children: '培养单位意见' }}>
      <ContentFiled className="CounsellorForm-wrap">
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">辅导员</Text>
          <Input
            disabled
            className="DepartmentForm-item-Input"
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
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">辅导员签字</Text>
          <Input className="CounsellorForm-item-Input sigh-input"></Input>
        </View>
        <View className="CounsellorForm-item">
          <Text className="CounsellorForm-item-tag">时 间</Text>
          <Input
            disabled
            className="CounsellorForm-item-Input "
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
