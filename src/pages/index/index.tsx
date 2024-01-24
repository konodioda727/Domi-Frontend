import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import PageWrap from "../../components/pageWrap/pageWrap";
import './index.less'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <PageWrap topBarProps={{pos:'leftWithButton',children: 'text'}}></PageWrap>
    </View>
  )
}
