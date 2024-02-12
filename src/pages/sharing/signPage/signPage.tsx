import Taro, { useRouter } from "@tarojs/taro";
import { useRef } from "react";
import { View } from "@tarojs/components";
import { CanvasSign, CanvasSignContext } from '@/components/signature/signature'
import Button from "@/components/button/button";
import "./index.less";

const QuestionList: React.FC = () => {
  const signRef = useRef<CanvasSignContext>(null);
  const router = useRouter();

  // 确认签名完成
  const onSubmit = async () => {
    const result = await signRef.current?.saveAsImage()
    if (!result) return console.error('签名失败')

    // 用事件总线把导出的签名图发射出去
    Taro.eventCenter.trigger(router.params.type || '', { url: result.tempFilePath });
    Taro.navigateBack({ delta: 1 });
  }

  const onClear = () => {
    signRef.current?.clear();
  }

  const onCancel = () => {
    Taro.navigateBack({ delta: 1 });
  }

  return (
    <View className='signPagecontainer'>
      <CanvasSign ref={signRef} />
      <View className='signPagebtns'>
        <Button className='signPagebtn' onClick={onClear}>
          重置
        </Button>
        <Button className='signPagebtn' onClick={onCancel}>
          取消
        </Button>
        <Button className='signPagebtn'  onClick={onSubmit}>
          提交
        </Button>
      </View>
    </View>
  );
};

export default QuestionList;
