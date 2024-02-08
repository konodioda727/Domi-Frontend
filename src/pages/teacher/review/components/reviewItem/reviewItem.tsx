import React from "react";
import {Image, View} from "@tarojs/components";
import './reviewItem.less'

const ReviewItem:React.FC = () => {
  return (
    <>
      <View className='review-item'>
        <View className='review-item-header'>
          <View className='review-item-name'>name</View>
          <View className='review-item-time'>time</View>
        </View>
        <View className='review-item-body'>
          <ReviewItemInfo building='123' room='123'></ReviewItemInfo>
          <Image src='https://s2.loli.net/2024/02/08/KXsmcZEMA1kaOqH.png' className='review-item-arrow'></Image>
          <ReviewItemInfo building='12345' room='123'></ReviewItemInfo>
        </View>
        <View className='review-item-footer'>
          <View className='review-item-grade'>xx专业xx级</View>
        </View>
      </View>
    </>
  )
}

export default ReviewItem

const ReviewItemInfo: React.FC<{building: string, room:string}> = ({building, room}) => {
  return (
    <View className='review-item-info'>
      <View className='review-info-building'>{building}</View>
      <View className='review-info-room'>{room}</View>
    </View>
  )
}
