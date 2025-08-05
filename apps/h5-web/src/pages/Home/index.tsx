import {
  Box,
  Card,
  Text,
  Title,
  SimpleGrid,
  Center,
  Stack,
} from "@mantine/core";
import {
  IconDeviceMobile,
  IconBolt,
  IconShieldCheck,
  IconRocket,
} from "@tabler/icons-react";

const Home = () => {
  const features = [
    {
      icon: IconDeviceMobile,
      title: "移动端优化",
      description: "专为移动设备设计",
      color: "blue",
    },
    {
      icon: IconBolt,
      title: "极速开发",
      description: "Vite + SWC 极速体验",
      color: "green",
    },
    {
      icon: IconShieldCheck,
      title: "类型安全",
      description: "TypeScript 全覆盖",
      color: "violet",
    },
    {
      icon: IconRocket,
      title: "生产就绪",
      description: "完整工程化配置",
      color: "orange",
    },
  ];

  return (
    <Box p="md">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        className="bg-primary-500 text-white mb-4"
      >
        <Stack align="center" gap="xs">
          <Title order={2} c="white">
            React H5 Web
          </Title>
          <Text size="sm" c="white" opacity={0.9}>
            现代化移动端开发模板
          </Text>
        </Stack>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Title order={4} mb="sm">
          欢迎使用 👋
        </Title>
        <Text size="sm" c="dimmed">
          这是一个基于 React 19 + TypeScript + Vite + Mantine UI 构建的现代化 H5
          项目模板，集成了完整的工程化配置和移动端优化方案。
        </Text>
      </Card>

      <Title order={5} mb="md">
        核心特性
      </Title>

      <SimpleGrid cols={2} spacing="md">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Stack align="center" gap="xs">
                <Center
                  className={`w-12 h-12 bg-${feature.color}-100 rounded-full`}
                >
                  <Icon size={24} className={`text-${feature.color}-500`} />
                </Center>
                <Text size="sm" fw={500}>
                  {feature.title}
                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  {feature.description}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>

      <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
        <Title order={5} mb="sm">
          快速开始
        </Title>
        <Stack gap="xs">
          <Text size="sm">
            <Text span fw={500}>
              1.
            </Text>{" "}
            查看工具演示了解 mobile-utils 功能
          </Text>
          <Text size="sm">
            <Text span fw={500}>
              2.
            </Text>{" "}
            浏览图片画廊体验优化加载
          </Text>
          <Text size="sm">
            <Text span fw={500}>
              3.
            </Text>{" "}
            开始构建你的移动应用
          </Text>
        </Stack>
      </Card>
    </Box>
  );
};

export default Home;
