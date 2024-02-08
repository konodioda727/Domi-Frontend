import ContentFiled from "@/components/contentField/contentFiled";
import React from "react";
import {View} from "@tarojs/components";
import PageWrap from "@/components/pageWrap/pageWrap";
import ReviewItem from "@/pages/teacher/review/components/reviewItem/reviewItem";
import Searchbar from "@/pages/teacher/review/components/searchbar/searchbar";
import './review.less'

const Review: React.FC = () => {
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
            <ReviewItem></ReviewItem>
          </View>
        </ContentFiled>
      </PageWrap>
    </>
  )
}

export default Review
