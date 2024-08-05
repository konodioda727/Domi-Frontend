import Taro from "@tarojs/taro";
import { TaroElement, TaroNode, TaroRootElement, document } from "@tarojs/runtime";
export function getPageElement() {
    const currentPages = Taro.getCurrentPages();
    const currentPage = currentPages[currentPages.length - 1];
    const path = currentPage.$taroPath;
    const pageElement = document.getElementById<TaroRootElement>(path);
    console.log('path',path);
    return pageElement
}