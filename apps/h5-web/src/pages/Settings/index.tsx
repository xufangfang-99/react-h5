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
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { clearRequestCache } from "@/utils/request";
import { localStorage } from "@packages/mobile-utils";

const Settings = () => {
  const navigate = useNavigate();

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
      title: "通用设置",
      items: [
        {
          icon: IconMoon,
          label: "深色模式",
          description: "开启后使用深色主题",
          action: <Switch defaultChecked={false} />,
        },
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
                        ) : (
                          item.action
                        )}
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
