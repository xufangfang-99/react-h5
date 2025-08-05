import {
  Box,
  Card,
  Title,
  Text,
  Avatar,
  Button,
  Stack,
  Group,
} from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronRight,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const User = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const menuItems = [
    {
      icon: IconSettings,
      label: "设置",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Box p="md">
        <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
          <Avatar size={80} radius="xl" mx="auto" mb="md" color="gray">
            <IconUser size={40} />
          </Avatar>
          <Title order={4} mb="sm">
            未登录
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            登录后查看个人信息
          </Text>
          <Button onClick={() => navigate("/login")} fullWidth>
            立即登录
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box p="md">
      <Card shadow="sm" padding="xl" radius="md" withBorder mb="md">
        <Stack align="center" gap="md">
          <Avatar size={80} radius="xl" color="blue">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <div className="text-center">
            <Title order={4}>{user?.name || "用户"}</Title>
            <Text size="sm" c="dimmed">
              {user?.email || "user@example.com"}
            </Text>
          </div>
        </Stack>
      </Card>

      <Stack gap="xs">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.path}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(item.path)}
            >
              <Group justify="space-between">
                <Group gap="md">
                  <Icon size={20} />
                  <Text>{item.label}</Text>
                </Group>
                <IconChevronRight size={16} className="text-gray-400" />
              </Group>
            </Card>
          );
        })}

        <Card
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          className="cursor-pointer hover:bg-gray-50"
          onClick={handleLogout}
        >
          <Group justify="space-between">
            <Group gap="md">
              <IconLogout size={20} className="text-red-500" />
              <Text c="red">退出登录</Text>
            </Group>
            <IconChevronRight size={16} className="text-gray-400" />
          </Group>
        </Card>
      </Stack>
    </Box>
  );
};

export default User;
