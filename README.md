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


  - `topbarprops`中`pos`为文字摆放位置，`leftWithButton` 为带返回按钮，
  - `hasNavbar`为是否带下方`navbar`，会根据文件在`teachers`还是`tudents`自动区分导航栏功能，具体配置见`configs`中的`navbarConfig`

2. contentField
   
  大白布，带圆角和阴影和padding，当view用
