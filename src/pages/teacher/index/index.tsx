import { View } from '@tarojs/components';
import PageWrap from '../../../components/pageWrap/pageWrap';
import './index.less';

export default function Index() {
  return (
    <View className="index">
      <PageWrap
        topBarProps={{ pos: 'leftWithButton', children: 'text' }}
      ></PageWrap>
    </View>
  );
}
