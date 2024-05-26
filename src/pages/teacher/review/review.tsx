import ContentFiled from "@/components/contentField/contentFiled";
import React, {useState} from "react";
import {View} from "@tarojs/components";
import PageWrap from "@/components/pageWrap/pageWrap";
import ReviewItem from "@/pages/teacher/review/components/reviewItem/reviewItem";
import Searchbar from "@/pages/teacher/review/components/searchbar/searchbar";
import {useDidShow} from "@tarojs/taro";
import {fetchApproveList} from "@/services/fetch";
import {applicationResponseType} from "@/services/fetchTypes";
import './review.less'


const Review: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<applicationResponseType[]>([])
  useDidShow(() => {
    fetchApproveList({
      cur_form_id: 0,
      pending: 'true',
      limit: 10
    }).then((res) => {
      res && setReviewItems(res.data.data)
    })
  })
  return (
    <>
      <PageWrap topBarProps={{pos: 'center'}} hasNavbar>
        <Searchbar></Searchbar>
        <ContentFiled className='review-content'>
          <View className='reviewed'>
            <View className='reviewed-text'>未审批</View>
            <View className='seperate-line'>|</View>
            <View className='reviewed-text'>已审批</View>
          </View>
          <View className='reviewed-items'>
            {reviewItems.map(item => <ReviewItem {...item}></ReviewItem>)}
          </View>
        </ContentFiled>
      </PageWrap>
    </>
  )
}

export default Review
