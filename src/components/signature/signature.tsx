import { Canvas, View } from "@tarojs/components"
import Taro, { CanvasContext, useReady } from "@tarojs/taro";
import { FC, forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import "./index.less";

/**
 * 签名组件 ref context
 */
export interface CanvasSignContext {
  clear: () => void
  saveAsImage: () => Promise<ToDataURLResult>
}

/**
* CanvasSign.props 参数类型
*/
export interface CanvasSignProps {
  ref?: Ref<CanvasSignContext>
}

/**
 * canvas 导入图片结果
 */
 export interface ToDataURLResult {
  tempFilePath: string
  errMsg: string
}

/**
 * 将 canvas 内容转换成 图片临时路径
 */
const toDataURL = async (canvasId: string, canvas?: CanvasContext): Promise<ToDataURLResult> => {
  if (!canvas) return { errMsg: 'canvas is null', tempFilePath: '' }

  return new Promise((resolve, reject) => {
    canvas.draw(true, () => {
      Taro.canvasToTempFilePath({
        canvasId: canvasId,
        fileType: 'png',
        success: res => resolve(res),
        fail: err => reject(err)
      });
    });
  })
}

/**
 * 获取 canvas 的尺寸
 */
const getCanvasSize = async (canvasId: string): Promise<{ height: number, width: number }> => {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery()
    query.select('#' + canvasId)
      .boundingClientRect()
      .exec(([size]) => resolve(size))
  })
}

/**
 * 签名绘图 canvas 组件
 * 
 * @see https://juejin.cn/post/6978721559397531678
 */
export const CanvasSign: FC<CanvasSignProps> = forwardRef((props, ref) => {
  // 绘图画布引用
  const [context,_]=useState<Taro.CanvasContext>(Taro.createCanvasContext('myCanvas'))
  // 绘制轨迹信息
  const [lineInfo,setLineInfo]=useState({startX: 0, startY: 0 })

  useReady(() => {
    context.setLineWidth(4)
    context.setStrokeStyle("#000000")
    context.setLineCap('round')
    context.setLineJoin('round')

  })

  function canvasStart (e: any) {
    e.preventDefault();
    setLineInfo({startX: e.touches[0].x, startY:e.touches[0].y })
    context.beginPath()
  }

  function canvasMove  (e: any)  {
    e.preventDefault();

    let x = e.touches[0].x
    let y = e.touches[0].y
   context.moveTo(lineInfo.startX, lineInfo.startY)
    context.lineTo(x, y)
    context.stroke()
    context.draw(true)
    lineInfo.startX = x
    lineInfo.startY = y
  }

  const clear = () => {
    context.draw();
  }

  const saveAsImage = async () => {
    const { tempFilePath } = await toDataURL('myCanvas', context)
    const { width, height } = await getCanvasSize('saveCanvas')

    // 这里完成了签名图片的旋转操作
    const saveCanvas = Taro.createCanvasContext('saveCanvas')
    saveCanvas.translate(0, height)
    saveCanvas.rotate(-90 * Math.PI / 180)
    saveCanvas.drawImage(tempFilePath, 0, 0, height, width)

    return await toDataURL('saveCanvas', saveCanvas)
  }

  useImperativeHandle(ref, () => ({ clear, saveAsImage }))

  return (
    <View className='signCanvascontainer'>
      {/* 这个 canvas 用来签名 */}
      <Canvas
        className='signCanvas'
        canvasId='myCanvas'
        id='myCanvas'
        disableScroll
        onTouchStart={canvasStart}
        onTouchMove={canvasMove}
      ></Canvas>

      {/* 这个 canvas 用于把签名内容旋转九十度 */}
      <Canvas
        className='saveCanvas'
        canvasId='saveCanvas'
        id='saveCanvas'
      ></Canvas>
    </View>
  )
})


export default CanvasSign
