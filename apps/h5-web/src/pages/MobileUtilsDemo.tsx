import { useState } from "react";
import {
  // 设备检测
  getDeviceInfo,
  isIOS,
  isAndroid,
  isSlowNetwork,
  getRecommendedImageQuality,
  // 存储工具
  localStorage,
  formatPhone,
  formatMoney,
  // DOM 操作
  copyToClipboard,
  scrollToElement,
  disableScroll,
  enableScroll,
  // React Hooks
  useDeviceInfo,
  useNetworkStatus,
  useGesture,
  useInViewport,
  useWindowSize,
  useScrollPosition,
  useCountdown,
} from "@packages/mobile-utils";

export default function MobileUtilsDemo() {
  const [phone, setPhone] = useState("13812345678");
  const [money, setMoney] = useState("1234.56");
  const [storageKey, setStorageKey] = useState("testKey");
  const [storageValue, setStorageValue] = useState("testValue");
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [activeTab, setActiveTab] = useState("device");

  // Hooks 使用
  const deviceInfo = useDeviceInfo();
  const networkStatus = useNetworkStatus();
  const windowSize = useWindowSize();
  const scrollPosition = useScrollPosition();

  // 手势识别 ref
  const swipeRef = useGesture<HTMLDivElement>({
    onSwipeLeft: () => {
      alert("向左滑动");
    },
    onSwipeRight: () => {
      alert("向右滑动");
    },
    onSwipeUp: () => {
      alert("向上滑动");
    },
    onSwipeDown: () => {
      alert("向下滑动");
    },
    onTap: () => {
      alert("点击");
    },
    onLongPress: () => {
      alert("长按");
    },
  });

  // 视口检测
  const [inViewRef, inViewport] = useInViewport({ threshold: 0.5 });

  // 倒计时
  const countdown = useCountdown(
    new Date(Date.now() + 60 * 60 * 1000), // 1小时后
    {
      onComplete: () => {
        alert("倒计时结束");
      },
    },
  );

  const showModal = (content: string) => {
    setModalContent(content);
    setModalOpened(true);
  };

  const tabs = [
    { id: "device", label: "设备检测" },
    { id: "gesture", label: "手势识别" },
    { id: "network", label: "网络状态" },
    { id: "storage", label: "存储工具" },
    { id: "format", label: "格式化" },
    { id: "dom", label: "DOM操作" },
    { id: "hooks", label: "Hooks" },
  ];

  return (
    <div className="p-4 pb-20">
      <h3 className="text-xl font-bold mb-4">Mobile Utils 功能演示</h3>

      {/* Tabs */}
      <div className="mb-4">
        <div className="flex overflow-x-auto border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "device" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">设备信息</h5>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">是否移动设备</td>
                    <td className="py-2">
                      {deviceInfo.isMobile ? "是" : "否"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">操作系统</td>
                    <td className="py-2">
                      {deviceInfo.isIOS
                        ? "iOS"
                        : deviceInfo.isAndroid
                          ? "Android"
                          : "其他"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">微信环境</td>
                    <td className="py-2">
                      {deviceInfo.isWeChat ? "是" : "否"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">刘海屏</td>
                    <td className="py-2">
                      {deviceInfo.isIPhoneX ? "是" : "否"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">屏幕方向</td>
                    <td className="py-2">{deviceInfo.orientation}</td>
                  </tr>
                  <tr>
                    <td className="py-2">屏幕尺寸</td>
                    <td className="py-2">
                      {deviceInfo.screenWidth} x {deviceInfo.screenHeight}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold mb-3">静态方法测试</h5>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const info = getDeviceInfo();
                    showModal(JSON.stringify(info, null, 2));
                  }}
                  className="w-full py-2 bg-primary-500 text-white rounded"
                >
                  获取完整设备信息
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert(`iOS: ${isIOS()}`)}
                    className="py-2 bg-gray-100 rounded"
                  >
                    检测 iOS
                  </button>
                  <button
                    onClick={() => alert(`Android: ${isAndroid()}`)}
                    className="py-2 bg-gray-100 rounded"
                  >
                    检测 Android
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "gesture" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">手势测试区域</h5>
              <div
                ref={swipeRef}
                className="h-48 bg-primary-100 rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-gray-600">在此区域进行手势操作</p>
                  <p className="text-sm text-gray-500">
                    支持：滑动、点击、长按
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">网络信息</h5>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">网络状态</td>
                    <td className="py-2">
                      {networkStatus.online ? "在线" : "离线"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">网络类型</td>
                    <td className="py-2">{networkStatus.type}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">有效类型</td>
                    <td className="py-2">
                      {networkStatus.effectiveType || "未知"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">省流模式</td>
                    <td className="py-2">
                      {networkStatus.saveData ? "是" : "否"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold mb-3">网络建议</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>慢速网络：</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      isSlowNetwork()
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isSlowNetwork() ? "是" : "否"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>推荐图片质量：</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                    {getRecommendedImageQuality()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "storage" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">本地存储</h5>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="键名"
                  value={storageKey}
                  onChange={(e) => setStorageKey(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="键值"
                  value={storageValue}
                  onChange={(e) => setStorageValue(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      localStorage.set(storageKey, storageValue, 60000);
                      alert("保存成功（1分钟后过期）");
                    }}
                    className="flex-1 py-2 bg-green-500 text-white rounded"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => {
                      const value = localStorage.get(storageKey);
                      alert(value ? `读取成功: ${value}` : "无数据或已过期");
                    }}
                    className="flex-1 py-2 bg-blue-500 text-white rounded"
                  >
                    读取
                  </button>
                  <button
                    onClick={() => {
                      localStorage.remove(storageKey);
                      alert("删除成功");
                    }}
                    className="flex-1 py-2 bg-red-500 text-white rounded"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "format" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">手机号格式化</h5>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="输入手机号"
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <div className="space-y-1">
                <p className="text-sm">隐藏: {formatPhone(phone)}</p>
                <p className="text-sm">显示: {formatPhone(phone, false)}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">金额格式化</h5>
              <input
                type="number"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                placeholder="输入金额"
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <div className="space-y-1">
                <p className="text-sm">人民币: {formatMoney(money)}</p>
                <p className="text-sm">
                  美元: {formatMoney(money, { prefix: "$" })}
                </p>
                <p className="text-sm">
                  无小数: {formatMoney(money, { decimals: 0 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dom" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">复制到剪贴板</h5>
              <button
                onClick={async () => {
                  const success = await copyToClipboard("Hello Mobile Utils!");
                  alert(success ? "复制成功" : "复制失败");
                }}
                className="w-full py-2 bg-primary-500 text-white rounded"
              >
                复制文本
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold mb-3">滚动控制</h5>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    disableScroll();
                    alert("已禁用滚动");
                    setTimeout(() => {
                      enableScroll();
                      alert("已恢复滚动");
                    }, 3000);
                  }}
                  className="w-full py-2 bg-orange-500 text-white rounded"
                >
                  禁用滚动3秒
                </button>
                <button
                  onClick={() => {
                    scrollToElement(document.body, { duration: 500 });
                  }}
                  className="w-full py-2 bg-blue-500 text-white rounded"
                >
                  回到顶部
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hooks" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">窗口信息</h5>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">窗口尺寸</td>
                    <td className="py-2">
                      {windowSize.width} x {windowSize.height}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">滚动位置</td>
                    <td className="py-2">
                      X: {scrollPosition.x}, Y: {scrollPosition.y}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h5 className="text-lg font-semibold mb-3">倒计时</h5>
              <p className="text-center text-lg font-bold">
                {countdown.days}天 {countdown.hours}时 {countdown.minutes}分{" "}
                {countdown.seconds}秒
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold mb-3">视口检测</h5>
              <div
                ref={inViewRef}
                className={`h-32 rounded-lg flex items-center justify-center ${
                  inViewport ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <p>{inViewport ? "在视口内" : "不在视口内"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpened && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">详细信息</h3>
            </div>
            <div className="p-4 overflow-auto max-h-[60vh]">
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {modalContent}
              </pre>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setModalOpened(false)}
                className="w-full py-2 bg-gray-500 text-white rounded"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
