import { useState } from "react";
import Taro from "@tarojs/taro";

interface ModalParams extends Taro.showModal.Option {
    successCallback?: () => void;
}
export function useModal(params: ModalParams) {
    const [isShow, setIsShow] = useState<boolean>(false)
    const {title, content, successCallback} = params
    function triggerModal() {
        setIsShow(true)
        Taro.showModal({
            title: title ?? '提示',
            content: content ?? '这是一个模态弹窗',
            success: function (res) {
                res.confirm && successCallback && successCallback()
                setIsShow(false)
            }
          })
    }
    return [isShow, triggerModal]
}