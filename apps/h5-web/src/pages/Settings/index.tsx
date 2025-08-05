import {
  Box,
  Card,
  Title,
  Stack,
  Group,
  Text,
  Switch,
  Button,
  ActionIcon,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconMoon,
  IconBell,
  IconShield,
  IconLanguage,
  IconPalette,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { clearRequestCache } from "@/utils/request";
import { localStorage } from "@packages/mobile-utils";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();

  const handleClearCache = () => {
    clearRequestCache();
    localStorage.clear();
    notifications.show({
      message: "缓存已清理",
      color: "green",
    });
  };

  const settingGroups = [
    {
      title: "个性化",
      items: [
        {
          icon: IconPalette,
          label: "主题",
          description: "选择您喜欢的颜色主题",
          action: "theme-selector",
        },
        {
          icon: IconMoon,
          label: "深色模式",
          description: "开启后使用深色主题",
          action: (
            <Switch
              checked={theme === "dark"}
              onChange={(e) =>
                setTheme(e.currentTarget.checked ? "dark" : "default")
              }
            />
          ),
        },
      ],
    },
    {
      title: "通用设置",
      items: [
        {
          icon: IconBell,
          label: "消息通知",
          description: "接收应用推送通知",
          action: <Switch defaultChecked={true} />,
        },
        {
          icon: IconLanguage,
          label: "语言",
          description: "简体中文",
          action: "arrow",
        },
      ],
    },
    {
      title: "隐私与安全",
      items: [
        {
          icon: IconShield,
          label: "隐私设置",
          description: "管理您的隐私偏好",
          action: "arrow",
        },
      ],
    },
  ];

  return (
    <Box className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <Box className="bg-white shadow-sm sticky top-0 z-10">
        <Group justify="space-between" p="md">
          <Group gap="sm">
            <ActionIcon variant="subtle" onClick={() => navigate(-1)} size="lg">
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={4}>设置</Title>
          </Group>
        </Group>
      </Box>

      {/* 设置内容 */}
      <Stack gap="md" p="md">
        {settingGroups.map((group) => (
          <div key={group.title}>
            <Text size="sm" c="dimmed" fw={500} mb="xs" pl="sm">
              {group.title}
            </Text>
            <Card shadow="sm" radius="md" withBorder p={0}>
              <Stack gap={0}>
                {group.items.map((item, index) => {
                  const Icon = item.icon;

                  // 主题选择器特殊处理
                  if (item.action === "theme-selector") {
                    return (
                      <Box
                        key={item.label}
                        p="md"
                        className={
                          index !== group.items.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }
                      >
                        <Group gap="md" mb="md">
                          <Icon size={20} className="text-gray-600" />
                          <div className="flex-1">
                            <Text size="sm" fw={500}>
                              {item.label}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.description}
                            </Text>
                          </div>
                        </Group>

                        {/* 主题选择器 */}
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(themes).map(([key, config]) => {
                            if (key === "dark") return null; // 深色模式单独控制
                            return (
                              <button
                                key={key}
                                onClick={() => setTheme(key as any)}
                                className={`
                                  relative p-3 rounded-lg border-2 transition-all
                                  ${
                                    theme === key
                                      ? "border-primary-500 bg-primary-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }
                                `}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-6 h-6 rounded-full"
                                    style={{ backgroundColor: config.primary }}
                                  />
                                  <Text size="xs" fw={500}>
                                    {config.name}
                                  </Text>
                                </div>
                                {theme === key && (
                                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </Box>
                    );
                  }

                  return (
                    <Box
                      key={item.label}
                      p="md"
                      className={`${
                        index !== group.items.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      } ${
                        item.action === "arrow"
                          ? "cursor-pointer hover:bg-gray-50"
                          : ""
                      }`}
                      onClick={() => {
                        if (item.action === "arrow") {
                          notifications.show({
                            message: `点击了 ${item.label}`,
                            color: "blue",
                          });
                        }
                      }}
                    >
                      <Group justify="space-between">
                        <Group gap="md">
                          <Icon size={20} className="text-gray-600" />
                          <div>
                            <Text size="sm" fw={500}>
                              {item.label}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.description}
                            </Text>
                          </div>
                        </Group>
                        {item.action === "arrow" ? (
                          <IconChevronLeft
                            size={16}
                            className="text-gray-400 rotate-180"
                          />
                        ) : item.action !== "theme-selector" ? (
                          item.action
                        ) : null}
                      </Group>
                    </Box>
                  );
                })}
              </Stack>
            </Card>
          </div>
        ))}

        {/* 其他操作 */}
        <Card shadow="sm" radius="md" withBorder p="md">
          <Stack gap="sm">
            <Button
              variant="light"
              color="blue"
              fullWidth
              onClick={handleClearCache}
            >
              清理缓存
            </Button>
            <Button
              variant="light"
              color="gray"
              fullWidth
              onClick={() => {
                notifications.show({
                  message: "当前版本: v1.0.0",
                  color: "blue",
                });
              }}
            >
              关于我们
            </Button>
          </Stack>
        </Card>

        {/* 版本信息 */}
        <Text size="xs" c="dimmed" ta="center" mt="xl">
          版本 1.0.0
        </Text>
      </Stack>
    </Box>
  );
};

export default Settings;
