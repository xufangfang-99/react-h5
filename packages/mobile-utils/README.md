# @packages/mobile-utils

移动端常用工具库，提供设备检测、手势识别、网络状态、存储增强等功能。

## 安装

```bash
# 在 monorepo 根目录运行
pnpm --filter @apps/h5-web add @packages/mobile-utils
```

## 功能模块

### 1. 设备检测 (device)

```typescript
import {
  getDeviceInfo,
  isIOS,
  isAndroid,
  isWeChat,
} from "@packages/mobile-utils";

// 获取完整设备信息
const deviceInfo = getDeviceInfo();
console.log(deviceInfo);
// {
//   isMobile: true,
//   isIOS: true,
//   isAndroid: false,
//   isWeChat: false,
//   deviceType: 'mobile',
//   orientation: 'portrait',
//   ...
// }

// 单独判断
if (isIOS()) {
  console.log("iOS 设备");
}

if (isWeChat()) {
  console.log("微信环境");
}
```

### 2. 手势识别 (gesture)

```typescript
import { GestureRecognizer, onSwipe, onPinch } from "@packages/mobile-utils";

// 方式1：使用便捷函数
const cleanup = onSwipe(element, (event) => {
  console.log("滑动方向:", event.direction);
  console.log("滑动距离:", event.distance);
});

// 方式2：使用类
const recognizer = new GestureRecognizer(element);
element.addEventListener("swipe", (e) => {
  console.log("滑动事件:", e.detail);
});
```

### 3. 网络状态 (network)

```typescript
import {
  getNetworkInfo,
  onNetworkChange,
  getRecommendedImageQuality,
} from "@packages/mobile-utils";

// 获取网络信息
const networkInfo = getNetworkInfo();
console.log("网络类型:", networkInfo.type);
console.log("是否在线:", networkInfo.online);

// 监听网络变化
const cleanup = onNetworkChange((info) => {
  console.log("网络状态变化:", info);
});

// 根据网络选择图片质量
const quality = getRecommendedImageQuality();
const imageUrl = `/images/photo_${quality}.jpg`;
```

### 4. 存储工具 (storage)

```typescript
import { localStorage, secureStorage, cookie } from "@packages/mobile-utils";

// 普通存储
localStorage.set("user", { name: "张三" }, 24 * 60 * 60 * 1000); // 1天过期
const user = localStorage.get("user");

// 加密存储
secureStorage.set("token", "secret-token");

// Cookie 操作
cookie.set("session", "abc123", { expires: 7 * 24 * 60 * 60 * 1000 });
const session = cookie.get("session");
```

### 5. 格式化工具 (format)

```typescript
import {
  formatPhone,
  formatMoney,
  formatRelativeTime,
} from "@packages/mobile-utils";

// 手机号格式化
formatPhone("13812345678"); // "138****5678"
formatPhone("13812345678", false); // "138 1234 5678"

// 金额格式化
formatMoney(1234.56); // "¥1,234.56"
formatMoney(1234.5, { prefix: "$", decimals: 0 }); // "$1,235"

// 相对时间
formatRelativeTime(new Date(Date.now() - 60000)); // "1分钟前"
```

### 6. DOM 操作 (dom)

```typescript
import {
  disableScroll,
  enableScroll,
  scrollToElement,
  copyToClipboard,
} from "@packages/mobile-utils";

// 禁用/启用滚动
disableScroll();
enableScroll();

// 平滑滚动
scrollToElement("#target", { offset: 60, duration: 500 });

// 复制到剪贴板
const success = await copyToClipboard("复制的文本");
```

### 7. React Hooks

```typescript
import { useDeviceInfo, useGesture, useNetworkStatus, useLocalStorage } from '@packages/mobile-utils';

// 设备信息
function App() {
  const deviceInfo = useDeviceInfo();

  return <div>{deviceInfo.isIOS ? 'iOS' : 'Android'}</div>;
}

// 手势识别
function SwipeableCard() {
  const ref = useGesture<HTMLDivElement>({
    onSwipeLeft: () => console.log('向左滑动'),
    onSwipeRight: () => console.log('向右滑动'),
  });

  return <div ref={ref}>可滑动的卡片</div>;
}

// 网络状态
function NetworkIndicator() {
  const network = useNetworkStatus();

  return <div>网络: {network.type}</div>;
}

// 本地存储
function Settings() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  );
}
```

## 完整 API 文档

### Device 模块

- `isMobile()`: 判断是否为移动设备
- `isIOS()`: 判断是否为 iOS
- `isAndroid()`: 判断是否为 Android
- `isWeChat()`: 判断是否在微信中
- `isAlipay()`: 判断是否在支付宝中
- `getDeviceType()`: 获取设备类型
- `getScreenOrientation()`: 获取屏幕方向
- `isIPhoneX()`: 判断是否为刘海屏
- `getDeviceInfo()`: 获取完整设备信息

### Gesture 模块

- `GestureRecognizer`: 手势识别类
- `onSwipe()`: 监听滑动
- `onTap()`: 监听点击
- `onLongPress()`: 监听长按
- `onPinch()`: 监听捏合

### Network 模块

- `getNetworkInfo()`: 获取网络信息
- `onNetworkChange()`: 监听网络变化
- `isSlowNetwork()`: 判断慢速网络
- `isFastNetwork()`: 判断高速网络
- `getRecommendedImageQuality()`: 推荐图片质量
- `getRecommendedVideoQuality()`: 推荐视频质量

### Storage 模块

- `Storage`: 增强存储类
- `localStorage`: 本地存储实例
- `sessionStorage`: 会话存储实例
- `secureStorage`: 加密存储实例
- `cookie`: Cookie 操作对象

### Format 模块

- `formatPhone()`: 格式化手机号
- `formatBankCard()`: 格式化银行卡
- `formatMoney()`: 格式化金额
- `formatFileSize()`: 格式化文件大小
- `formatRelativeTime()`: 格式化相对时间
- `formatCountdown()`: 格式化倒计时
- `formatIdCard()`: 格式化身份证
- `formatName()`: 格式化姓名

### DOM 模块

- `disableScroll()`: 禁用滚动
- `enableScroll()`: 启用滚动
- `scrollToElement()`: 滚动到元素
- `getElementSize()`: 获取元素尺寸
- `isInViewport()`: 判断元素是否在视口
- `copyToClipboard()`: 复制到剪贴板
- `fullscreen`: 全屏操作对象

### Hooks

- `useDeviceInfo()`: 设备信息
- `useNetworkStatus()`: 网络状态
- `useGesture()`: 手势识别
- `useInViewport()`: 视口检测
- `useLocalStorage()`: 本地存储
- `useDebounce()`: 防抖
- `useThrottle()`: 节流
- `useWindowSize()`: 窗口尺寸
- `useScrollPosition()`: 滚动位置
- `usePageVisibility()`: 页面可见性
- `useCountdown()`: 倒计时

## License

MIT
