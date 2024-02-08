import React, { useState ,useEffect} from "react";
import ContentFiled from "@/components/contentField/contentFiled";
import PageWrap from "@/components/pageWrap/pageWrap";
import {Text,RadioGroup,View,Input, Textarea, Label, Radio} from "@tarojs/components";
import './index.less'

const DepartmentForm: React.FC=()=>{
    useEffect(()=>{
        setResult(true);setCounsellorAdvice('');setCharger('');sethandleDate('');
    },[])
  const [result,setResult]=useState<boolean>()
  const [counsellorAdvice,setCounsellorAdvice]=useState('')
  const [charger,setCharger]=useState('')
  const [handleDate,sethandleDate]=useState('')
    return(
        <PageWrap  topBarProps={{pos:'leftWithButton', children:'学工部审核'}}>
            <ContentFiled className='DepartmentForm-wrap'>
                <View className='DepartmentForm-item'>
                    <Text className='DepartmentForm-item-tag'>负责人</Text>
                    <Input disabled className='DepartmentForm-item-Input' value={charger}></Input>
                </View>
                <View className='DepartmentForm-item'>
                    <Text className='DepartmentForm-item-tag'>是否同意调宿</Text>
                   <RadioGroup>
                        <Label className='checking-reslut-label'>
                           <Radio disabled value='yes' checked={result}></Radio><Text>是</Text>
                        </Label>
                        <Label className='checking-reslut-label'>
                            <Radio disabled value='no'  checked={result==false}></Radio><Text>否</Text>
                        </Label>
                   </RadioGroup>
                </View>
                <Textarea value={counsellorAdvice} maxlength={500} disabled className='DepartmentForm-item' id='counsellorAdvice'></Textarea >
                <View className='DepartmentForm-item'>
                    <Text className='DepartmentForm-item-tag'>负责人签字</Text>
                    <Input className='DepartmentForm-item-Input sigh-input'></Input>
                </View>
                <View className='DepartmentForm-item'>
                    <Text className='DepartmentForm-item-tag'>时 间</Text>
                    <Input disabled className='DepartmentForm-item-Input ' value={handleDate}></Input>
                </View>
                <View className='DepartmentForm-item'>
                    <Text className='DepartmentForm-item-tag'>电子盖章</Text>
                    <View className='DepartmentForm-stamp'></View>
                </View>
            </ContentFiled>
        </PageWrap>
    )
}
export default DepartmentForm;
