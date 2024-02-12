import React, {useRef,  useState, useEffect } from 'react';
import Taro, { useReady } from '@tarojs/taro';

import { View, Canvas, Button } from '@tarojs/components';

type TouchEvent = {
    changedTouches: Array<{
    x: number;
    y: number;
  }>;
};

const SignatureCanvas: React.FC = () => {
    const { windowWidth, windowHeight } = Taro.getSystemInfoSync()
    const canvasRef = useRef<Taro.CanvasContext | null>(null);
useReady(()=>{
    canvasRef.current = Taro.createCanvasContext("signatureCanvas");
})

  const handleTouchStart = (e:TouchEvent) => {
    e.preventDefault();
    console.log(canvasRef.current);
    canvasRef.current?.setFillStyle('red')
    canvasRef.current?.fillRect(10, 10, 150, 75)
    canvasRef.current?.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
      canvasRef.current?.beginPath()
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
      const x = e.changedTouches[0].x;
      const y = e.changedTouches[0].y;
      canvasRef.current?.setStrokeStyle('black'); 
      canvasRef.current?.setLineWidth(2); 
      canvasRef.current?.lineTo(x, y);
      canvasRef.current?.stroke();
      canvasRef.current?.draw();
      
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current?.clearRect(0, 0, windowWidth,windowHeight);
    }
  };

  const handleExport = () => {
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowWidth,
      height: windowHeight,
      destWidth:windowWidth,
      destHeight:windowHeight,
      canvasId: 'signatureCanvas',
      success: (res) => {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            Taro.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
            });
          },
          fail: () => {
            Taro.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000,
            });
          },
        });
      },
    });
  };
  return (
    <View>
      <Canvas
        type='33'
        id='signatureCanvas'
        canvasId='signatureCanvas'
        style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      {/* <Button onClick={handleClear}>清空</Button>
      <Button onClick={handleExport}>导出</Button> */}
    </View>
  );
};

export default SignatureCanvas;
