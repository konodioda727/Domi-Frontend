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

2. ContentField
   
   大白布，带圆角和阴影和padding，当view用

3. Input Button

   加了样式的 `Input` 和 `Button`，支持自定义，`Button`自带 100ms 的防抖， `Input` 没加，可以根据需求加上 `throttle`（使用 `useThrottle` 这个 `hook` ）
   > `Button` 新增 `disable` , 和 `disabledPrompt` 属性, 负责按钮禁用以及禁用弹窗

5. Login

   老师、辅导员、学生登录的公用组件，接受参数如下：

   ```
    export interface LoginProps {
      loginConfigs: LoginConfigType[],
      logoConfigs: LogoProps,
      onRegister?: (...args: any[]) => void,
      onLogin: (...args: any[]) => void
    }
    
    export type LoginConfigType = {
      type: keyof InputProps.Type,
      title: string,
      displayText: string
    }
    
    export interface LogoProps extends Omit<ImageProps, 'src'>{
      size?: 'big' | 'small' | 'medium',
    }
   
   ```
   
- `loginConfigs`: 登陆页面中输入框的配置
- `logoConfigs`: 图标配置，可以调节 `small` | `big` | `medium` 三种大小
- `onRegister`: 注册的处理函数，不填即没有注册按钮
- `onLogin`: 必填，登录的处理函数

> 其中，`onRegister` 和 `onLogin` 接受 两个参数， 一个为`paramSet`, 即各个输入框内容集合，以`loginConfigType`中的`title`为属性名， 另一个为`clear`，是回调函数，负责清除输入框内容

# 更新日志

### 2月2日

- 增加了 `useThrottle` 和 `useDebounce` 两个 `hook`
- 增加了 `loginPage`
- 增加了 `Input`， `Button`，`Login`组件,详情见 `componnents概述`
- 重构 `PageWrap` 和 `NavBar`，将复杂提到配置文件夹 `Config` 中
- 重构 申请界面，将 颜色配置、跳转链接配置等提到配置文件夹 `Config` 中
