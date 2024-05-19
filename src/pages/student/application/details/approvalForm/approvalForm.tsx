import Button from "@/components/button/button";
import academys from "./formInfo";
import {Text,ScrollView,View,Input,Picker, Textarea ,Image} from "@tarojs/components";
import './index.less'
import Taro from "@tarojs/taro";

const ApprovalForm: React.FC=()=>{
  const [submitDate,setSubmitDate]=useState('')
      // 签名图片的 临时路径
      const [ownerSignUrl, setOwnerSignUrl] = useState('');
    
      // 拉起签名页
      const jumpToSign = () => {
        const eventKey = `${new Date().getTime()}`
    
        Taro.eventCenter.once(eventKey, data => {
          setOwnerSignUrl(data.url)
          
        })
    
        Taro.navigateTo({ url: `/pages/sharing/signPage/signPage?type=${eventKey}` });
      }
    return(
        <PageWrap  topBarProps={{pos:'leftWithButton', children:'CCNU 换宿审批'}}>
          <ScrollView scrollY className='approvalForm-wrap'>
            <View className='approvalForm-wrap-content'>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>姓 名</Text>
                <Input className='approvalForm-item-Input' value={applicationInfo.name} onInput={(e) => handleInput(e, 'name')}></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>学 号</Text>
                <Input className='approvalForm-item-Input' value={applicationInfo.student_id} onInput={(e)=>handleInput(e, 'student_id')}></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>学 院</Text>
                <Picker mode='selector' range={academys} onChange={(e)=>setApplicationInfo({...applicationInfo, 'college': academys[e.detail.value]})}>
                  <View className='approvalForm-item-Input'>
                    {applicationInfo.college}
                  </View>
                </Picker>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag smaller-tag'>联系方式</Text>
                <Input className='approvalForm-item-Input' value={applicationInfo.contact} onInput={(e)=>handleInput(e, 'contact')}></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>辅导员</Text>
                <Input className='approvalForm-item-Input' value={applicationInfo.teacher_id} onInput={(e)=>handleInput(e, 'teacher_id')}></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现楼栋号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调楼栋号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现寝室号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调寝室号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>现床位号</Text>
                <Text className='approvalForm-item-tag bigger-tag'>拟调床位号</Text>
              </View>
              <View className='approvalForm-item'>
                <Input className='approvalForm-item-Input smaller-input'></Input>
                <Input className='approvalForm-item-Input smaller-input'></Input>
              </View>
              <View className='form-textarea-intro'>个人申请</View>
              <View className='form-textarea-intro'>（请阐明调寝原因）</View>
              <Textarea id='changingReason' maxlength={500}></Textarea>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag bigger-tag'>申请人签字</Text>
                <View className='approvalForm-item-Input smaller-input'>
                  {ownerSignUrl
                      ? <Image className='smaller-input' src={ownerSignUrl} onClick={() => jumpToSign()} />
                      : <View  className='smaller-input' onClick={() => jumpToSign()}>点击签名</View>
                  }
                </View>
              </View>
              <View className='approvalForm-item'>
                <Text className='approvalForm-item-tag'>时间</Text>
                <Picker mode='date' value={submitDate} onChange={(e)=>setSubmitDate(e.detail.value)}>
                  <View className='date-picker'>
                    <View className='date-detail bigger-tag'>{submitDate.slice(0,4)}</View >年
                    <View className='date-detail'>{submitDate.slice(5,7)}</View >月
                    <View className='date-detail'>{submitDate.slice(8,10)}</View >日
                  </View>
                </Picker>
              </View>
            </View>
          </ScrollView>
          <View className='formButtonbox'>
            <Button onClick={handleSaveLocal} className='form-checking-button'>保存草稿</Button>
            <Button className='form-checking-button' onClick={handleSubmit}>提交申请</Button>
          </View>
        </PageWrap>
    )
}
export default ApprovalForm;
