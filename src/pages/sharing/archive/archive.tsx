import {FC, useState} from "react";
import {View} from "@tarojs/components";
import PageWrap from "@/components/pageWrap/pageWrap";
import ContentFiled from "@/components/contentField/contentFiled";
import {fetchArchives} from "@/services/fetch";
import {useDidShow} from "@tarojs/taro";
import {applicationResponseType} from "@/services/fetchTypes";
import ReviewItem from "@/pages/teacher/review/components/reviewItem/reviewItem";
import Taro from '@tarojs/taro'
import './index.less'

const Archive: FC = () => {
  const [forms, setForms] = useState<applicationResponseType[]>([])
  const handleItemClick = (formId: number) => {
    const pdfLink = forms.find((item) => item.id === formId)?.pdf
    Taro.showModal({
      title: '提示',
      content: `点击按钮复制链接到浏览器下载吧`,
      showCancel: false,
      confirmText: '复制链接',
      success: function (res) {
        if (res.confirm) {
          Taro.setClipboardData({
            data: pdfLink || '',
          })
        }
      }
    })
  }
  useDidShow(() => {
    fetchArchives().then((res) => {
      if(res && res.data.code === 0) {
        setForms(res.data.data)
      }
    })
  });
  return (
    <PageWrap topBarProps={{children: '我的申请表', pos: 'centerWithButton'}}>
      <ContentFiled className='archive-page'>
        <View className="reviewed-items">
          {forms.map(item => (
            <ReviewItem onClick={(item) => handleItemClick(item)} {...item}></ReviewItem>
          ))}
          {!forms.length && <View className='empty-sign'>空空如也～</View>}
        </View>
      </ContentFiled>
    </PageWrap>
  )
}

export default Archive
