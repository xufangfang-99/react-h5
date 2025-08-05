import { useState } from "react";
import {
  Box,
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Checkbox,
} from "@mantine/core";
import { IconUser, IconLock } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "@/store/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      notifications.show({
        message: "请填写用户名和密码",
        color: "red",
      });
      return;
    }

    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 模拟登录成功
      const mockUser = {
        id: "1",
        name: formData.username,
        email: `${formData.username}@example.com`,
      };
      const mockToken = "mock-jwt-token";

      login(mockUser, mockToken);

      notifications.show({
        message: "登录成功",
        color: "green",
      });

      // 跳转到之前的页面或首页
      navigate(from, { replace: true });

      setLoading(false);
    }, 1000);
  };

  return (
    <Box className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        className="w-full max-w-sm"
      >
        <Title order={3} ta="center" mb="lg">
          欢迎登录
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="用户名"
              placeholder="请输入用户名"
              leftSection={<IconUser size={16} />}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.currentTarget.value })
              }
              required
            />

            <PasswordInput
              label="密码"
              placeholder="请输入密码"
              leftSection={<IconLock size={16} />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.currentTarget.value })
              }
              required
            />

            <Checkbox
              label="记住我"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({ ...formData, remember: e.currentTarget.checked })
              }
            />

            <Button type="submit" fullWidth loading={loading}>
              登录
            </Button>
          </Stack>
        </form>

        <Text size="sm" ta="center" mt="md" c="dimmed">
          测试账号：任意用户名和密码
        </Text>
      </Card>
    </Box>
  );
};

export default Login;
