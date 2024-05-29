import { applicationResponseType } from '@/services/fetchTypes';
import { Nav } from '@/utils/nav';
import { Image, View } from '@tarojs/components';
import React from 'react';
import './reviewItem.less';

const ReviewItem: React.FC<applicationResponseType> = props => {
  const { id, name, ctime, school, dst_location, src_location } = props;
  const handleClick = () => {
    Nav(`/pages/teacher/checking/checking?formID=${id}`);
  };
  const date = new Date(ctime).toLocaleDateString()
  return (
    <>
      <View className="review-item" onClick={handleClick}>
        <View className="review-item-header">
          <View className="review-item-name">{name}</View>
          <View className="review-item-time">{date}</View>
        </View>
        <View className="review-item-body">
          <ReviewItemInfo
            building={src_location?.building || ''}
            room={src_location?.room || ''}
          ></ReviewItemInfo>
          <Image
            src="https://s2.loli.net/2024/02/08/KXsmcZEMA1kaOqH.png"
            className="review-item-arrow"
          ></Image>
          <ReviewItemInfo
            building={dst_location?.building || ''}
            room={dst_location?.room || ''}
          ></ReviewItemInfo>
        </View>
        <View className="review-item-footer">
          <View className="review-item-grade">{school}</View>
        </View>
      </View>
    </>
  );
};

export default ReviewItem;

const ReviewItemInfo: React.FC<{ building: string; room: string }> = ({
  building,
  room,
}) => {
  return (
    <View className="review-item-info">
      <View className="review-info-building">{building}</View>
      <View className="review-info-room">{room}</View>
    </View>
  );
};
