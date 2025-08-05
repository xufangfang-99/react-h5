import { Box, Loader, Text } from "@mantine/core";

interface LoadingProps {
  tip?: string;
}

const Loading = ({ tip = "加载中..." }: LoadingProps) => {
  return (
    <Box className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader size="lg" variant="bars" mb="sm" />
        <Text size="sm" c="dimmed">
          {tip}
        </Text>
      </div>
    </Box>
  );
};

export default Loading;
