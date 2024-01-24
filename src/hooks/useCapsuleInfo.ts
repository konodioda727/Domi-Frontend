import Taro from "@tarojs/taro";

interface CapsuleInfoType {
  capsulePos: Taro.getMenuButtonBoundingClientRect.Rect;
  barPos: Taro.getSystemInfoSync.Result;
}

export const useCapsuleInfo = (): CapsuleInfoType => {
  const capPos = Taro.getMenuButtonBoundingClientRect();
  const barPos = Taro.getSystemInfoSync();
  return {capsulePos: capPos, barPos: barPos};
};
