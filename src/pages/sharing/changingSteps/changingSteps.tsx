import React from "react";
import PageWrap from "@/components/pageWrap/pageWrap";
import {Image} from "@tarojs/components";
import './index.less'

const ChangingSteps: React.FC=()=>{
    return(
        <PageWrap  topBarProps={{pos:'leftWithButton', children:'换宿流程说明'}}>
            <Image className='changingstep_img' src='https://s2.loli.net/2024/02/04/OfNjDMU7gKxFHIJ.png'></Image>
        </PageWrap>
    )
}
export default ChangingSteps;