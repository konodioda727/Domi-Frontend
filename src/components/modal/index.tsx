import React, { FC, ReactNode } from 'react';
import { View } from '@tarojs/components';
import { render, unmountComponentAtNode } from '@tarojs/react';
import { document } from '@tarojs/runtime';

import './Modal.less';
import { getRoot } from '@/hooks/useGetRoot';
import Button from '../button/button';
import { getPageElement } from '@/utils/getPageElement';

interface ModalProps {
  visible?: boolean;
  opacity?: number;
  width?: string;
  height?: string;
  title?: ReactNode;
  content: ReactNode;
  onSuccess?: (type: 'success' | 'fail') => void;
  conFirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const Modal: FC<ModalProps> & {show: (args: ModalProps) => any} = ({
  visible,
  opacity = 0.6,
  width = '86vw',
  height = '30vh',
  title,
  content,
  onSuccess,
  showCancel = true,
  conFirmText = '确定',
  cancelText = '取消',
}) => {
  if (!visible && typeof visible !== 'undefined') return null;

  return (
    <View className="modal-box" style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}>
      <View className="modal-content" style={{ width, height }}>
        {title ? <View className='modal-title'>{title}</View> : null}
        <View className='modal-text'>{content}</View>
        <View className='modal-footer'>
          <Button onClick={() => onSuccess && onSuccess('success')} className='modal-confirm'>{conFirmText}</Button>
          {showCancel ? <Button onClick={() => onSuccess && onSuccess('fail')} className='modal-cancel'>{cancelText}</Button> : null}
        </View>
      </View>
    </View>
  )
};

Modal.show = ({onSuccess, ...params}: ModalProps) => {
    const view = document.createElement('view');
    const pageElement = getPageElement() || getRoot();
    console.log('page', pageElement);
    
    const handleSuccess = (type: 'success' | 'fail') => {
        onSuccess && onSuccess(type)
        unmountComponentAtNode(view);
        pageElement?.removeChild(view)
    }
    render(<Modal {...params} onSuccess={handleSuccess} />, view);
    pageElement?.appendChild(view);
}

export default Modal