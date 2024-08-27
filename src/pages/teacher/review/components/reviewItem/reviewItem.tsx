import { applicationResponseType } from '@/services/fetchTypes';
import { Image, View } from '@tarojs/components';
import {FC, useMemo} from 'react';
import './reviewItem.less';
import {dateGene} from "@/utils/dateGene";
import { imgMap } from '@/configs/applicationConfig';
import { APPLICATION_STATUS } from '@/pages/types/loginProps';

const ReviewItem: FC<applicationResponseType & {onClick?: (formId: number)=>void}> = props => {
  const { id, name, onClick, ctime, school, dst_location, src_location, reason, status, gender } = props;
  const handleClick = () => {
    onClick && onClick(id)
  };
  const displayReason = useMemo(() =>{
    if(reason?.length &&reason?.length > 4) {
      return reason?.slice(0, 4) + '...'
    }
    return reason;
  }, [reason])
  const date = dateGene(ctime)
  return (
    <>
      <View className="review-item" onClick={handleClick}>
        <View className="review-item-header">
          <View className="review-item-name">{`${name}\t${gender}`}</View>
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
            building={dst_location?.building || '暂无'}
            room={dst_location?.room || ''}
          ></ReviewItemInfo>
        </View>
        <View className="review-item-footer">
          <View className='review-item-reason'>调宿理由：{displayReason}</View>
          <View className="review-item-grade">{school}</View>
        </View>
        {status !== APPLICATION_STATUS.SUBMIT && (
          <Image src={imgMap[status.toLowerCase().includes('pass') ? 'success' : 'fail']} fadeIn className="review-item-state" />
        )}
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
