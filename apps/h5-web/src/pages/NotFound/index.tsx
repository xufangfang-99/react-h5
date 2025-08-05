import { Box, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Title order={1} size={80} c="gray.3" mb="md">
          404
        </Title>
        <Title order={3} mb="sm">
          页面未找到
        </Title>
        <Text c="dimmed" mb="xl">
          抱歉，您访问的页面不存在
        </Text>
        <Button onClick={() => navigate("/")} size="md">
          返回首页
        </Button>
      </div>
    </Box>
  );
};

export default NotFound;
