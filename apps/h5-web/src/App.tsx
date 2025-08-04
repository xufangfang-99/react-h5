import { useState } from "react";
import {
  AppShell,
  Tabs,
  rem,
  Card,
  Text,
  Title,
  SimpleGrid,
  Box,
  Center,
  Stack,
  Avatar,
} from "@mantine/core";
import {
  IconHome,
  IconList,
  IconUser,
  IconDeviceMobile,
  IconBolt,
} from "@tabler/icons-react";
import MobileUtilsDemo from "./pages/MobileUtilsDemo";

function App() {
  const [activeTab, setActiveTab] = useState("demo");

  const iconStyle = { width: rem(20), height: rem(20) };

  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      setActiveTab(value);
    }
  };

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{ width: 0, breakpoint: 0 }}
      padding={0}
    >
      <Box className="mobile-container">
        <Box className="flex-1 overflow-auto">
          {activeTab === "home" && (
            <Box p="md">
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="bg-primary-500 text-white mb-4"
              >
                <Title order={3} ta="center" c="white">
                  React H5 Web
                </Title>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                <Title order={4} mb="sm">
                  欢迎使用
                </Title>
                <Text size="sm" c="dimmed">
                  这是一个基于 Vite + React + TypeScript + UnoCSS 构建的现代化
                  H5 项目模板。
                </Text>
              </Card>

              <SimpleGrid cols={2} spacing="md">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack align="center" gap="xs">
                    <Center className="w-12 h-12 bg-primary-100 rounded-full">
                      <IconDeviceMobile
                        size={24}
                        className="text-primary-500"
                      />
                    </Center>
                    <Text size="sm">移动端优化</Text>
                  </Stack>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack align="center" gap="xs">
                    <Center className="w-12 h-12 bg-green-100 rounded-full">
                      <IconBolt size={24} className="text-green-500" />
                    </Center>
                    <Text size="sm">极速开发</Text>
                  </Stack>
                </Card>
              </SimpleGrid>
            </Box>
          )}

          {activeTab === "demo" && <MobileUtilsDemo />}

          {activeTab === "user" && (
            <Box p="md">
              <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
                <Avatar size={80} radius="xl" mx="auto" mb="md" color="gray">
                  <IconUser size={40} />
                </Avatar>
                <Title order={4} mb="sm">
                  用户中心
                </Title>
                <Text size="sm" c="dimmed">
                  暂未登录
                </Text>
              </Card>
            </Box>
          )}
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="default"
          className="border-t"
        >
          <Tabs.List grow>
            <Tabs.Tab value="home" leftSection={<IconHome style={iconStyle} />}>
              首页
            </Tabs.Tab>
            <Tabs.Tab value="demo" leftSection={<IconList style={iconStyle} />}>
              工具演示
            </Tabs.Tab>
            <Tabs.Tab value="user" leftSection={<IconUser style={iconStyle} />}>
              我的
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
    </AppShell>
  );
}

export default App;
