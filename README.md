# domi-frontend-v1
采用react+ts+less+taro开发的华师智能换宿小程序
# components概述
1. PageWrap
   `PageWrap` 为页面组件，配置背景色和上下导航栏
   接受参数如下：


   ```
   export interface TopBarProps {
     children?: React.ReactElement | string,
     pos: 'left' | 'center' | 'leftWithButton',
   }
   export interface PageWrapProps {
     children?:  React.ReactElement,
     topBarProps: TopBarProps,
     hasNavbar?: boolean
   }
   ```


  - topbarprops中pos为文字摆放位置，leftWithButton 为带返回按钮，
  - hasNavbar为是否带下方navbar，会根据文件在teachers还是students自动区分导航栏功能，具体配置见configs中的navbarConfig

2. contentField
  大白布，带圆角和阴影和padding，当view用
