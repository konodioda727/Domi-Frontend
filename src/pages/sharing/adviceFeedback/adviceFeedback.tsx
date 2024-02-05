import React from "react";
import PageWrap from "@/components/pageWrap/pageWrap";
import Button from "@/components/button/button";
import ContentFiled from "@/components/contentField/contentFiled";
import {Textarea} from "@tarojs/components";
import './index.less'
import { useState } from "react";

const AdviceFeedback: React.FC=()=>{
    const [adviceValue,setAdviceValue]=useState('')
    const sendadvice=()=>{
        console.log(adviceValue);      
    }
    return(
        <PageWrap  topBarProps={{pos:'leftWithButton', children:'意见反馈'}}>
            <ContentFiled className="advice-wrap">
                <Textarea id="adviceFeedback" maxlength={500} value={adviceValue} onInput={(e)=>setAdviceValue(e.detail.value)} placeholder='欢迎留下您宝贵的意见'></Textarea>
                <Button disabled={adviceValue==''} onClick={sendadvice}>反馈</Button>
            </ContentFiled>
        </PageWrap>
    )
}
export default AdviceFeedback;