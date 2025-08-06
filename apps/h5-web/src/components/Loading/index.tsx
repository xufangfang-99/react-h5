interface LoadingProps {
  tip?: string;
}

const Loading = ({ tip = "加载中..." }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-600">{tip}</p>
      </div>
    </div>
  );
};

export default Loading;
