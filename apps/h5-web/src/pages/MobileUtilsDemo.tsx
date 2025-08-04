import { useState, useRef } from "react";
import {
  Button,
  Card,
  List,
  Toast,
  Space,
  Divider,
  Tag,
  Input,
  Dialog,
  Tabs,
} from "antd-mobile";
import {
  // 设备检测
  getDeviceInfo,
  isIOS,
  isAndroid,
  isWeChat,
  isIPhoneX,
  getScreenOrientation,
  // 手势识别
  onSwipe,
  onTap,
  onLongPress,
  // 网络状态
  getNetworkInfo,
  isSlowNetwork,
  getRecommendedImageQuality,
  // 存储工具
  localStorage,
  sessionStorage,
  secureStorage,
  cookie,
  // 格式化工具
  formatPhone,
  formatMoney,
  formatBankCard,
  formatRelativeTime,
  formatFileSize,
  formatIdCard,
  formatName,
  formatCountdown,
  // DOM 操作
  copyToClipboard,
  scrollToElement,
  disableScroll,
  enableScroll,
  fullscreen,
  // React Hooks
  useDeviceInfo,
  useNetworkStatus,
  useGesture,
  useInViewport,
  useLocalStorage,
  useDebounce,
  useThrottle,
  useWindowSize,
  useScrollPosition,
  useCountdown,
} from "@packages/mobile-utils";

export default function MobileUtilsDemo() {
  const [activeTab, setActiveTab] = useState("device");
  const [phone, setPhone] = useState("13812345678");
  const [money, setMoney] = useState("1234.56");
  const [bankCard, setBankCard] = useState("6222021234567890123");
  const [storageKey, setStorageKey] = useState("testKey");
  const [storageValue, setStorageValue] = useState("testValue");

  // Hooks 使用
  const deviceInfo = useDeviceInfo();
  const networkStatus = useNetworkStatus();
  const windowSize = useWindowSize();
  const scrollPosition = useScrollPosition();
  const [localValue, setLocalValue, removeLocalValue] = useLocalStorage(
    "demo",
    "默认值",
  );

  // 手势识别 ref
  const swipeRef = useGesture<HTMLDivElement>({
    onSwipeLeft: () => {
      Toast.show("向左滑动");
    },
    onSwipeRight: () => {
      Toast.show("向右滑动");
    },
    onSwipeUp: () => {
      Toast.show("向上滑动");
    },
    onSwipeDown: () => {
      Toast.show("向下滑动");
    },
    onTap: () => {
      Toast.show("点击");
    },
    onLongPress: () => {
      Toast.show("长按");
    },
  });

  // 视口检测
  const [inViewRef, inViewport] = useInViewport({ threshold: 0.5 });

  // 倒计时
  const countdown = useCountdown(
    new Date(Date.now() + 60 * 60 * 1000), // 1小时后
    {
      onComplete: () => {
        Toast.show("倒计时结束");
      },
    },
  );

  // 防抖测试
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  // 节流测试
  const [throttleValue, setThrottleValue] = useState("");
  const throttledValue = useThrottle(throttleValue, 1000);

  return (
    <div className="p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Mobile Utils 功能演示</h1>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.Tab title="设备检测" key="device">
          <Card title="设备信息" className="mb-4">
            <List>
              <List.Item extra={deviceInfo.isMobile ? "是" : "否"}>
                是否移动设备
              </List.Item>
              <List.Item
                extra={
                  deviceInfo.isIOS
                    ? "iOS"
                    : deviceInfo.isAndroid
                      ? "Android"
                      : "其他"
                }
              >
                操作系统
              </List.Item>
              <List.Item extra={deviceInfo.isWeChat ? "是" : "否"}>
                微信环境
              </List.Item>
              <List.Item extra={deviceInfo.isIPhoneX ? "是" : "否"}>
                刘海屏
              </List.Item>
              <List.Item extra={deviceInfo.orientation}>屏幕方向</List.Item>
              <List.Item
                extra={`${deviceInfo.screenWidth} x ${deviceInfo.screenHeight}`}
              >
                屏幕尺寸
              </List.Item>
              <List.Item extra={deviceInfo.pixelRatio}>像素密度</List.Item>
            </List>
          </Card>

          <Card title="静态方法测试">
            <Space direction="vertical" className="w-full">
              <Button
                onClick={() => {
                  const info = getDeviceInfo();
                  Dialog.alert({
                    content: JSON.stringify(info, null, 2),
                  });
                }}
              >
                获取完整设备信息
              </Button>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="small"
                  onClick={() => {
                    Toast.show(`iOS: ${isIOS()}`);
                  }}
                >
                  检测 iOS
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    Toast.show(`Android: ${isAndroid()}`);
                  }}
                >
                  检测 Android
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    Toast.show(`微信: ${isWeChat()}`);
                  }}
                >
                  检测微信
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    Toast.show(`刘海屏: ${isIPhoneX()}`);
                  }}
                >
                  检测刘海屏
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    Toast.show(`屏幕方向: ${getScreenOrientation()}`);
                  }}
                >
                  获取屏幕方向
                </Button>
              </div>
            </Space>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="手势识别" key="gesture">
          <Card title="手势测试区域" className="mb-4">
            <div
              ref={swipeRef}
              className="h-48 bg-primary-100 rounded-lg flex-center relative"
            >
              <p className="text-gray-600">在此区域进行手势操作</p>
              <p className="text-sm text-gray-500 mt-2">
                支持：滑动、点击、长按
              </p>
            </div>
          </Card>

          <Card title="独立手势绑定" className="mb-4">
            <div className="space-y-4">
              <div
                ref={useRef<HTMLDivElement>(null)}
                className="h-24 bg-green-100 rounded-lg flex-center"
                onClick={() => {
                  const element = document.querySelector("#gesture-test");
                  if (element) {
                    const cleanup = onSwipe(element as HTMLElement, (event) => {
                      Toast.show(`滑动方向: ${event.direction}`);
                    });
                    setTimeout(cleanup, 10000); // 10秒后自动清理
                  }
                }}
                id="gesture-test"
              >
                <p className="text-sm">点击激活滑动识别（10秒后失效）</p>
              </div>

              <div
                className="h-24 bg-blue-100 rounded-lg flex-center"
                onClick={(e) => {
                  const element = e.currentTarget;
                  const cleanup = onTap(element, (event) => {
                    Toast.show(`点击位置: x=${event.x}, y=${event.y}`);
                  });
                  setTimeout(cleanup, 5000);
                }}
              >
                <p className="text-sm">点击激活点击监听（5秒后失效）</p>
              </div>

              <div
                className="h-24 bg-purple-100 rounded-lg flex-center"
                onClick={(e) => {
                  const element = e.currentTarget;
                  const cleanup = onLongPress(element, (event) => {
                    Toast.show(`长按 ${event.duration}ms`);
                  });
                  setTimeout(cleanup, 5000);
                }}
              >
                <p className="text-sm">点击激活长按监听（5秒后失效）</p>
              </div>
            </div>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="网络状态" key="network">
          <Card title="网络信息" className="mb-4">
            <List>
              <List.Item extra={networkStatus.online ? "在线" : "离线"}>
                网络状态
              </List.Item>
              <List.Item extra={networkStatus.type}>网络类型</List.Item>
              <List.Item extra={networkStatus.effectiveType || "未知"}>
                有效类型
              </List.Item>
              <List.Item
                extra={
                  networkStatus.downlink
                    ? `${networkStatus.downlink} Mbps`
                    : "未知"
                }
              >
                下行速度
              </List.Item>
              <List.Item
                extra={networkStatus.rtt ? `${networkStatus.rtt} ms` : "未知"}
              >
                延迟
              </List.Item>
              <List.Item extra={networkStatus.saveData ? "是" : "否"}>
                省流模式
              </List.Item>
            </List>
          </Card>

          <Card title="网络建议" className="mb-4">
            <Space direction="vertical" className="w-full">
              <div className="flex-between">
                <span>慢速网络：</span>
                <Tag color={isSlowNetwork() ? "danger" : "success"}>
                  {isSlowNetwork() ? "是" : "否"}
                </Tag>
              </div>
              <div className="flex-between">
                <span>推荐图片质量：</span>
                <Tag color="primary">{getRecommendedImageQuality()}</Tag>
              </div>
              <Button
                onClick={() => {
                  const info = getNetworkInfo();
                  Dialog.alert({
                    title: "完整网络信息",
                    content: JSON.stringify(info, null, 2),
                  });
                }}
                block
              >
                获取网络详情
              </Button>
            </Space>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="存储工具" key="storage">
          <Card title="本地存储" className="mb-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">键名</p>
                <Input
                  value={storageKey}
                  onChange={setStorageKey}
                  placeholder="输入键名"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">键值</p>
                <Input
                  value={storageValue}
                  onChange={setStorageValue}
                  placeholder="输入值"
                />
              </div>
              <Space>
                <Button
                  onClick={() => {
                    localStorage.set(storageKey, storageValue, 60000); // 1分钟过期
                    Toast.show("保存成功（1分钟后过期）");
                  }}
                  color="primary"
                  size="small"
                >
                  保存
                </Button>
                <Button
                  onClick={() => {
                    const value = localStorage.get(storageKey);
                    if (value) {
                      Toast.show(`读取成功: ${value}`);
                    } else {
                      Toast.show("无数据或已过期");
                    }
                  }}
                  size="small"
                >
                  读取
                </Button>
                <Button
                  onClick={() => {
                    localStorage.remove(storageKey);
                    Toast.show("删除成功");
                  }}
                  size="small"
                  color="danger"
                >
                  删除
                </Button>
              </Space>
            </div>
          </Card>

          <Card title="会话存储" className="mb-4">
            <Button
              onClick={() => {
                sessionStorage.set("session-data", {
                  user: "测试用户",
                  time: new Date().toLocaleString(),
                });
                const data = sessionStorage.get("session-data");
                Toast.show(`会话存储: ${JSON.stringify(data)}`);
              }}
              block
            >
              测试会话存储（关闭标签页后失效）
            </Button>
          </Card>

          <Card title="加密存储" className="mb-4">
            <Button
              onClick={() => {
                secureStorage.set("secret", "这是加密的数据");
                const encrypted = window.localStorage.getItem("secure_secret");
                Toast.show(`加密后: ${encrypted?.substring(0, 20)}...`);
              }}
              block
            >
              测试加密存储
            </Button>
          </Card>

          <Card title="Cookie 操作" className="mt-4">
            <Button
              onClick={() => {
                cookie.set("demo", "cookie-value", {
                  expires: 7 * 24 * 60 * 60 * 1000,
                });
                Toast.show("Cookie 已设置（7天后过期）");
              }}
              block
            >
              设置 Cookie
            </Button>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="格式化" key="format">
          <Card title="手机号格式化" className="mb-4">
            <Input value={phone} onChange={setPhone} placeholder="输入手机号" />
            <div className="mt-2 space-y-1">
              <p>隐藏: {formatPhone(phone)}</p>
              <p>显示: {formatPhone(phone, false)}</p>
            </div>
          </Card>

          <Card title="金额格式化" className="mb-4">
            <Input
              value={money}
              onChange={setMoney}
              placeholder="输入金额"
              type="number"
            />
            <div className="mt-2 space-y-1">
              <p>人民币: {formatMoney(money)}</p>
              <p>美元: {formatMoney(money, { prefix: "$" })}</p>
              <p>无小数: {formatMoney(money, { decimals: 0 })}</p>
            </div>
          </Card>

          <Card title="银行卡格式化" className="mb-4">
            <Input
              value={bankCard}
              onChange={setBankCard}
              placeholder="输入银行卡号"
            />
            <div className="mt-2 space-y-1">
              <p>隐藏: {formatBankCard(bankCard)}</p>
              <p>显示: {formatBankCard(bankCard, false)}</p>
            </div>
          </Card>

          <Card title="倒计时格式化" className="mb-4">
            <div className="space-y-2">
              <Button
                onClick={() => {
                  const endTime = new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000,
                  ); // 3天后
                  const countdown = formatCountdown(endTime);
                  Dialog.alert({
                    title: "倒计时格式化",
                    content: `
                      结束时间: ${endTime.toLocaleString()}
                      剩余: ${countdown.days}天 ${countdown.hours}时 ${countdown.minutes}分 ${countdown.seconds}秒
                      总毫秒数: ${countdown.total}
                    `,
                  });
                }}
                block
              >
                格式化倒计时（3天后）
              </Button>
            </div>
          </Card>

          <Divider>其他格式化功能</Divider>

          <Card title="其他格式化">
            <List>
              <List.Item
                extra={formatRelativeTime(new Date(Date.now() - 60000))}
              >
                相对时间
              </List.Item>
              <List.Item extra={formatFileSize(1024 * 1024 * 5.5)}>
                文件大小
              </List.Item>
              <List.Item extra={formatIdCard("110101199001011234")}>
                身份证
              </List.Item>
              <List.Item extra={formatName("张三丰")}>姓名</List.Item>
            </List>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="DOM操作" key="dom">
          <Card title="复制到剪贴板" className="mb-4">
            <Button
              onClick={async () => {
                const success = await copyToClipboard("Hello Mobile Utils!");
                Toast.show(success ? "复制成功" : "复制失败");
              }}
              block
            >
              复制文本
            </Button>
          </Card>

          <Card title="滚动控制" className="mb-4">
            <Space>
              <Button
                onClick={() => {
                  disableScroll();
                  Toast.show("已禁用滚动");
                  setTimeout(() => {
                    enableScroll();
                    Toast.show("已恢复滚动");
                  }, 3000);
                }}
              >
                禁用滚动3秒
              </Button>
              <Button
                onClick={() => {
                  scrollToElement(document.body, { duration: 500 });
                }}
              >
                回到顶部
              </Button>
            </Space>
          </Card>

          <Card title="全屏操作">
            <Button
              onClick={() => {
                fullscreen.toggle();
              }}
              block
            >
              切换全屏
            </Button>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="Hooks" key="hooks">
          <Card title="窗口信息" className="mb-4">
            <List>
              <List.Item extra={`${windowSize.width} x ${windowSize.height}`}>
                窗口尺寸
              </List.Item>
              <List.Item
                extra={`X: ${scrollPosition.x}, Y: ${scrollPosition.y}`}
              >
                滚动位置
              </List.Item>
            </List>
          </Card>

          <Divider>存储与状态管理</Divider>

          <Card title="本地存储 Hook" className="mb-4">
            <div className="space-y-2">
              <p>当前值: {localValue}</p>
              <Input
                value={localValue}
                onChange={(val) => setLocalValue(val)}
                placeholder="修改值"
              />
              <Button onClick={() => removeLocalValue()} size="small">
                清除
              </Button>
            </div>
          </Card>

          <Divider>性能优化 Hooks</Divider>

          <Card title="防抖测试" className="mb-4">
            <Input
              value={searchValue}
              onChange={setSearchValue}
              placeholder="输入搜索内容"
            />
            <p className="mt-2 text-sm text-gray-500">
              防抖后的值: {debouncedValue}
            </p>
          </Card>

          <Card title="节流测试" className="mb-4">
            <Input
              value={throttleValue}
              onChange={setThrottleValue}
              placeholder="快速输入测试节流"
            />
            <p className="mt-2 text-sm text-gray-500">
              节流后的值（1秒更新一次）: {throttledValue}
            </p>
          </Card>

          <Divider>时间与检测</Divider>

          <Card title="倒计时">
            <div className="text-center text-lg">
              {countdown.days}天 {countdown.hours}时 {countdown.minutes}分{" "}
              {countdown.seconds}秒
            </div>
          </Card>

          <Card title="视口检测" className="mt-4">
            <div
              ref={inViewRef}
              className={`h-32 rounded-lg flex-center ${
                inViewport ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <p>{inViewport ? "在视口内" : "不在视口内"}</p>
            </div>
          </Card>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
