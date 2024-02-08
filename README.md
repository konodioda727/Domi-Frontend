# domi-frontend-v1
采用react+ts+less+taro开发的华师换宿小程序

# 迭代须知
除组件特有逻辑之外，常规配置（如页面跳转和页面标题等）都提出到 `config` 文件夹中， 简单修改页面内容、跳转直接修改对应 `config`文件即可，
后续开发仍建议把此类逻辑提出到 `config` 中, 让组件中只包含主干逻辑，方便修改、重构

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

### 2月8日
- 前几天没管，今天赎罪
- 新增了教师端`review`页面静态
- 修改了`personalInfo`组件使其适应教师和学生两端
- 合并了能帅的分支和我的，静态就算完工啦，超级开心喔😀
### 2月3日

- 新增了 `PersonalInfo` 组件，对应教师和学生的个人页面， 但感觉教师端个人页面可能要改，待定，之后可能会删除
- 增加了 `studentPersonalInfo` 页面
- 重构 `studentPersonalInfo` 页面，把跳转逻辑提到 `Config`文件夹中
- `Taro.navigateTo` 写起来太烦了，简单封装了一下，放在， `utils`中，目前有 `Nav` 和 `Redirect` 两个函数，分别对应 `Taro.navigateTo` 和 `Taro.redirectTo`, 要加其他的自己加

### 2月2日

- 增加了 `useThrottle` 和 `useDebounce` 两个 `hook`
- 增加了 `loginPage`
- 增加了 `Input`， `Button`，`Login`组件,详情见 `componnents概述`
- 重构 `PageWrap` 和 `NavBar`，将复杂提到配置文件夹 `Config` 中
- 重构 申请界面，将 颜色配置、跳转链接配置等提到配置文件夹 `Config` 中
