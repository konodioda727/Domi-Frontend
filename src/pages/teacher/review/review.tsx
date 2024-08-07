import ContentFiled from '@/components/contentField/contentFiled';
import PageWrap from '@/components/pageWrap/pageWrap';
import ReviewItem from '@/pages/teacher/review/components/reviewItem/reviewItem';
import Searchbar from '@/pages/teacher/review/components/searchbar/searchbar';
import { fetchApproveList } from '@/services/fetch';
import { applicationResponseType } from '@/services/fetchTypes';
import { View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import './review.less';
import {Nav} from "@/utils/nav";

definePageConfig({
  disableScroll: true
})
const Review: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<applicationResponseType[]>([]);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const handleSubmit = (data: applicationResponseType[]) => {
    setReviewItems(data)
  }
  const handleItemClick = (formId: number) => {
    Nav(`/pages/teacher/checking/checking?formID=${formId}`);
  }
  const fetchItems = () =>
    fetchApproveList({
      cur_form_id: 0,
      pending: `${!isReviewed}`,
      limit: 10,
    }).then(res => {
      res && setReviewItems(res.data.data);
    });
  useDidShow(() => {
    fetchItems().then(null, null);
  });
  useEffect(() => {
    fetchItems().then(null, null);
  }, [isReviewed]);
  return (
    <>
      <PageWrap topBarProps={{ pos: 'center' }} hasNavbar>
        <Searchbar pending={!isReviewed} onSubmit={handleSubmit}></Searchbar>
        <ContentFiled className="review-content">
          <View className="reviewed">
            <View
              onClick={() => setIsReviewed(false)}
              className={
                !isReviewed ? 'reviewed-text-selected' : 'reviewed-text'
              }
            >
              未审批
            </View>
            <View
              onClick={() => setIsReviewed(true)}
              className={
                isReviewed ? 'reviewed-text-selected' : 'reviewed-text'
              }
            >
              已审批
            </View>
          </View>
          <View className="reviewed-items">
            {reviewItems.map(item => (
              <ReviewItem {...item} onClick={handleItemClick}></ReviewItem>
            ))}
            {!reviewItems.length && <View className='empty-sign'>空空如也～</View>}
          </View>
        </ContentFiled>
        <View className='unReviewed'>未审批共{reviewItems.length}条</View>
      </PageWrap>
    </>
  );
};

export default Review;
