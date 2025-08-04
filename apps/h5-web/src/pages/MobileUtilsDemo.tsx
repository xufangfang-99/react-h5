import { useState } from "react";
import {
  Button,
  Card,
  Text,
  Divider,
  Badge,
  TextInput,
  Tabs,
  Title,
  Group,
  Stack,
  Box,
  Modal,
  Code,
  Table,
  ScrollArea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
  const [phone, setPhone] = useState("13812345678");
  const [money, setMoney] = useState("1234.56");
  const [bankCard, setBankCard] = useState("6222021234567890123");
  const [storageKey, setStorageKey] = useState("testKey");
  const [storageValue, setStorageValue] = useState("testValue");
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
      notifications.show({ message: "向左滑动", color: "blue" });
    },
    onSwipeRight: () => {
      notifications.show({ message: "向右滑动", color: "blue" });
    },
    onSwipeUp: () => {
      notifications.show({ message: "向上滑动", color: "blue" });
    },
    onSwipeDown: () => {
      notifications.show({ message: "向下滑动", color: "blue" });
    },
    onTap: () => {
      notifications.show({ message: "点击", color: "green" });
    },
    onLongPress: () => {
      notifications.show({ message: "长按", color: "orange" });
    },
  });

  // 视口检测
  const [inViewRef, inViewport] = useInViewport({ threshold: 0.5 });

  // 倒计时
  const countdown = useCountdown(
    new Date(Date.now() + 60 * 60 * 1000), // 1小时后
    {
      onComplete: () => {
        notifications.show({ message: "倒计时结束", color: "red" });
      },
    },
  );

  // 防抖测试
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  // 节流测试
  const [throttleValue, setThrottleValue] = useState("");
  const throttledValue = useThrottle(throttleValue, 1000);

  const showModal = (content: string) => {
    setModalContent(content);
    setModalOpened(true);
  };

  const deviceRows = [
    { key: "是否移动设备", value: deviceInfo.isMobile ? "是" : "否" },
    {
      key: "操作系统",
      value: deviceInfo.isIOS
        ? "iOS"
        : deviceInfo.isAndroid
          ? "Android"
          : "其他",
    },
    { key: "微信环境", value: deviceInfo.isWeChat ? "是" : "否" },
    { key: "刘海屏", value: deviceInfo.isIPhoneX ? "是" : "否" },
    { key: "屏幕方向", value: deviceInfo.orientation },
    {
      key: "屏幕尺寸",
      value: `${deviceInfo.screenWidth} x ${deviceInfo.screenHeight}`,
    },
    { key: "像素密度", value: deviceInfo.pixelRatio },
  ];

  const networkRows = [
    { key: "网络状态", value: networkStatus.online ? "在线" : "离线" },
    { key: "网络类型", value: networkStatus.type },
    { key: "有效类型", value: networkStatus.effectiveType || "未知" },
    {
      key: "下行速度",
      value: networkStatus.downlink ? `${networkStatus.downlink} Mbps` : "未知",
    },
    {
      key: "延迟",
      value: networkStatus.rtt ? `${networkStatus.rtt} ms` : "未知",
    },
    { key: "省流模式", value: networkStatus.saveData ? "是" : "否" },
  ];

  return (
    <Box p="md" pb={80}>
      <Title order={3} mb="md">
        Mobile Utils 功能演示
      </Title>

      <Tabs defaultValue="device">
        <Tabs.List>
          <Tabs.Tab value="device">设备检测</Tabs.Tab>
          <Tabs.Tab value="gesture">手势识别</Tabs.Tab>
          <Tabs.Tab value="network">网络状态</Tabs.Tab>
          <Tabs.Tab value="storage">存储工具</Tabs.Tab>
          <Tabs.Tab value="format">格式化</Tabs.Tab>
          <Tabs.Tab value="dom">DOM操作</Tabs.Tab>
          <Tabs.Tab value="hooks">Hooks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="device" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              设备信息
            </Title>
            <Table>
              <Table.Tbody>
                {deviceRows.map((row) => (
                  <Table.Tr key={row.key}>
                    <Table.Td>{row.key}</Table.Td>
                    <Table.Td>{row.value}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              静态方法测试
            </Title>
            <Stack gap="sm">
              <Button
                onClick={() => {
                  const info = getDeviceInfo();
                  showModal(JSON.stringify(info, null, 2));
                }}
                fullWidth
              >
                获取完整设备信息
              </Button>
              <Group grow>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    notifications.show({ message: `iOS: ${isIOS()}` });
                  }}
                >
                  检测 iOS
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    notifications.show({ message: `Android: ${isAndroid()}` });
                  }}
                >
                  检测 Android
                </Button>
              </Group>
              <Group grow>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    notifications.show({ message: `微信: ${isWeChat()}` });
                  }}
                >
                  检测微信
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    notifications.show({ message: `刘海屏: ${isIPhoneX()}` });
                  }}
                >
                  检测刘海屏
                </Button>
              </Group>
              <Button
                size="sm"
                variant="light"
                onClick={() => {
                  notifications.show({
                    message: `屏幕方向: ${getScreenOrientation()}`,
                  });
                }}
                fullWidth
              >
                获取屏幕方向
              </Button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="gesture" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              手势测试区域
            </Title>
            <Box
              ref={swipeRef}
              className="h-48 bg-primary-100 rounded-lg flex-center relative"
            >
              <Stack align="center" gap="xs">
                <Text c="dimmed">在此区域进行手势操作</Text>
                <Text size="sm" c="dimmed">
                  支持：滑动、点击、长按
                </Text>
              </Stack>
            </Box>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              独立手势绑定
            </Title>
            <Stack gap="md">
              <Box
                className="h-24 bg-green-100 rounded-lg flex-center cursor-pointer"
                onClick={() => {
                  const element = document.querySelector("#gesture-test");
                  if (element) {
                    const cleanup = onSwipe(element as HTMLElement, (event) => {
                      notifications.show({
                        message: `滑动方向: ${event.direction}`,
                      });
                    });
                    setTimeout(cleanup, 10000); // 10秒后自动清理
                  }
                }}
                id="gesture-test"
              >
                <Text size="sm">点击激活滑动识别（10秒后失效）</Text>
              </Box>

              <Box
                className="h-24 bg-blue-100 rounded-lg flex-center cursor-pointer"
                onClick={(e) => {
                  const element = e.currentTarget;
                  const cleanup = onTap(element, (event) => {
                    notifications.show({
                      message: `点击位置: x=${event.x}, y=${event.y}`,
                    });
                  });
                  setTimeout(cleanup, 5000);
                }}
              >
                <Text size="sm">点击激活点击监听（5秒后失效）</Text>
              </Box>

              <Box
                className="h-24 bg-purple-100 rounded-lg flex-center cursor-pointer"
                onClick={(e) => {
                  const element = e.currentTarget;
                  const cleanup = onLongPress(element, (event) => {
                    notifications.show({
                      message: `长按 ${event.duration}ms`,
                    });
                  });
                  setTimeout(cleanup, 5000);
                }}
              >
                <Text size="sm">点击激活长按监听（5秒后失效）</Text>
              </Box>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="network" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              网络信息
            </Title>
            <Table>
              <Table.Tbody>
                {networkRows.map((row) => (
                  <Table.Tr key={row.key}>
                    <Table.Td>{row.key}</Table.Td>
                    <Table.Td>{row.value}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              网络建议
            </Title>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text>慢速网络：</Text>
                <Badge color={isSlowNetwork() ? "red" : "green"}>
                  {isSlowNetwork() ? "是" : "否"}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text>推荐图片质量：</Text>
                <Badge color="blue">{getRecommendedImageQuality()}</Badge>
              </Group>
              <Button
                onClick={() => {
                  const info = getNetworkInfo();
                  showModal(JSON.stringify(info, null, 2));
                }}
                fullWidth
              >
                获取网络详情
              </Button>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="storage" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              本地存储
            </Title>
            <Stack gap="md">
              <TextInput
                label="键名"
                value={storageKey}
                onChange={(e) => setStorageKey(e.currentTarget.value)}
                placeholder="输入键名"
              />
              <TextInput
                label="键值"
                value={storageValue}
                onChange={(e) => setStorageValue(e.currentTarget.value)}
                placeholder="输入值"
              />
              <Group>
                <Button
                  onClick={() => {
                    localStorage.set(storageKey, storageValue, 60000); // 1分钟过期
                    notifications.show({
                      message: "保存成功（1分钟后过期）",
                      color: "green",
                    });
                  }}
                  color="green"
                  size="sm"
                >
                  保存
                </Button>
                <Button
                  onClick={() => {
                    const value = localStorage.get(storageKey);
                    if (value) {
                      notifications.show({
                        message: `读取成功: ${value}`,
                        color: "blue",
                      });
                    } else {
                      notifications.show({
                        message: "无数据或已过期",
                        color: "red",
                      });
                    }
                  }}
                  size="sm"
                >
                  读取
                </Button>
                <Button
                  onClick={() => {
                    localStorage.remove(storageKey);
                    notifications.show({
                      message: "删除成功",
                      color: "orange",
                    });
                  }}
                  size="sm"
                  color="red"
                >
                  删除
                </Button>
              </Group>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              会话存储
            </Title>
            <Button
              onClick={() => {
                sessionStorage.set("session-data", {
                  user: "测试用户",
                  time: new Date().toLocaleString(),
                });
                const data = sessionStorage.get("session-data");
                notifications.show({
                  message: `会话存储: ${JSON.stringify(data)}`,
                  color: "blue",
                });
              }}
              fullWidth
            >
              测试会话存储（关闭标签页后失效）
            </Button>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              加密存储
            </Title>
            <Button
              onClick={() => {
                secureStorage.set("secret", "这是加密的数据");
                const encrypted = window.localStorage.getItem("secure_secret");
                notifications.show({
                  message: `加密后: ${encrypted?.substring(0, 20)}...`,
                  color: "violet",
                });
              }}
              fullWidth
            >
              测试加密存储
            </Button>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              Cookie 操作
            </Title>
            <Button
              onClick={() => {
                cookie.set("demo", "cookie-value", {
                  expires: 7 * 24 * 60 * 60 * 1000,
                });
                notifications.show({
                  message: "Cookie 已设置（7天后过期）",
                  color: "teal",
                });
              }}
              fullWidth
            >
              设置 Cookie
            </Button>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="format" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              手机号格式化
            </Title>
            <TextInput
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              placeholder="输入手机号"
              mb="sm"
            />
            <Stack gap="xs">
              <Text>隐藏: {formatPhone(phone)}</Text>
              <Text>显示: {formatPhone(phone, false)}</Text>
            </Stack>
          </Card>

          <Divider label="金额格式化" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              金额格式化
            </Title>
            <TextInput
              value={money}
              onChange={(e) => setMoney(e.currentTarget.value)}
              placeholder="输入金额"
              type="number"
              mb="sm"
            />
            <Stack gap="xs">
              <Text>人民币: {formatMoney(money)}</Text>
              <Text>美元: {formatMoney(money, { prefix: "$" })}</Text>
              <Text>无小数: {formatMoney(money, { decimals: 0 })}</Text>
            </Stack>
          </Card>

          <Divider label="银行卡格式化" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              银行卡格式化
            </Title>
            <TextInput
              value={bankCard}
              onChange={(e) => setBankCard(e.currentTarget.value)}
              placeholder="输入银行卡号"
              mb="sm"
            />
            <Stack gap="xs">
              <Text>隐藏: {formatBankCard(bankCard)}</Text>
              <Text>显示: {formatBankCard(bankCard, false)}</Text>
            </Stack>
          </Card>

          <Divider label="时间与倒计时" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              倒计时格式化
            </Title>
            <Button
              onClick={() => {
                const endTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3天后
                const countdown = formatCountdown(endTime);
                showModal(`
结束时间: ${endTime.toLocaleString()}
剩余: ${countdown.days}天 ${countdown.hours}时 ${countdown.minutes}分 ${countdown.seconds}秒
总毫秒数: ${countdown.total}
                `);
              }}
              fullWidth
            >
              格式化倒计时（3天后）
            </Button>
          </Card>

          <Divider label="其他格式化功能" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              其他格式化
            </Title>
            <Table>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>相对时间</Table.Td>
                  <Table.Td>
                    {formatRelativeTime(new Date(Date.now() - 60000))}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>文件大小</Table.Td>
                  <Table.Td>{formatFileSize(1024 * 1024 * 5.5)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>身份证</Table.Td>
                  <Table.Td>{formatIdCard("110101199001011234")}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>姓名</Table.Td>
                  <Table.Td>{formatName("张三丰")}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="dom" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              复制到剪贴板
            </Title>
            <Button
              onClick={async () => {
                const success = await copyToClipboard("Hello Mobile Utils!");
                notifications.show({
                  message: success ? "复制成功" : "复制失败",
                  color: success ? "green" : "red",
                });
              }}
              fullWidth
            >
              复制文本
            </Button>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              滚动控制
            </Title>
            <Group>
              <Button
                onClick={() => {
                  disableScroll();
                  notifications.show({
                    message: "已禁用滚动",
                    color: "orange",
                  });
                  setTimeout(() => {
                    enableScroll();
                    notifications.show({
                      message: "已恢复滚动",
                      color: "green",
                    });
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
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              全屏操作
            </Title>
            <Button
              onClick={() => {
                fullscreen.toggle();
              }}
              fullWidth
            >
              切换全屏
            </Button>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="hooks" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              窗口信息
            </Title>
            <Table>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>窗口尺寸</Table.Td>
                  <Table.Td>
                    {windowSize.width} x {windowSize.height}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>滚动位置</Table.Td>
                  <Table.Td>
                    X: {scrollPosition.x}, Y: {scrollPosition.y}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>

          <Divider label="存储与状态管理" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              本地存储 Hook
            </Title>
            <Stack gap="sm">
              <Text>当前值: {localValue}</Text>
              <TextInput
                value={localValue}
                onChange={(e) => setLocalValue(e.currentTarget.value)}
                placeholder="修改值"
              />
              <Button onClick={() => removeLocalValue()} size="sm" color="red">
                清除
              </Button>
            </Stack>
          </Card>

          <Divider label="性能优化 Hooks" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              防抖测试
            </Title>
            <TextInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              placeholder="输入搜索内容"
              mb="sm"
            />
            <Text size="sm" c="dimmed">
              防抖后的值: {debouncedValue}
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              节流测试
            </Title>
            <TextInput
              value={throttleValue}
              onChange={(e) => setThrottleValue(e.currentTarget.value)}
              placeholder="快速输入测试节流"
              mb="sm"
            />
            <Text size="sm" c="dimmed">
              节流后的值（1秒更新一次）: {throttledValue}
            </Text>
          </Card>

          <Divider label="时间与检测" labelPosition="center" my="md" />

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={5} mb="md">
              倒计时
            </Title>
            <Text ta="center" size="lg" fw={500}>
              {countdown.days}天 {countdown.hours}时 {countdown.minutes}分{" "}
              {countdown.seconds}秒
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} mb="md">
              视口检测
            </Title>
            <Box
              ref={inViewRef}
              className={`h-32 rounded-lg flex-center ${
                inViewport ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <Text>{inViewport ? "在视口内" : "不在视口内"}</Text>
            </Box>
          </Card>
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="详细信息"
        size="lg"
      >
        <ScrollArea h={400}>
          <Code block>{modalContent}</Code>
        </ScrollArea>
      </Modal>
    </Box>
  );
}
