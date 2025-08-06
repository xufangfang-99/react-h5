import { useNavigate } from "react-router-dom";
import { clearRequestCache } from "@/utils/request";
import { localStorage } from "@packages/mobile-utils";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();

  const handleClearCache = () => {
    clearRequestCache();
    localStorage.clear();
    alert("缓存已清理");
  };

  // 定义设置项的类型
  type SettingItem = {
    label: string;
    description: string;
  } & (
    | { type: "theme-selector" }
    | {
        type: "toggle";
        checked: boolean;
        onChange?: (checked: boolean) => void;
      }
    | { type: "link" }
  );

  type SettingGroup = {
    title: string;
    items: SettingItem[];
  };

  const settingGroups: SettingGroup[] = [
    {
      title: "个性化",
      items: [
        {
          label: "主题",
          description: "选择您喜欢的颜色主题",
          type: "theme-selector",
        },
        {
          label: "深色模式",
          description: "开启后使用深色主题",
          type: "toggle",
          checked: theme === "dark",
          onChange: (checked: boolean) =>
            setTheme(checked ? "dark" : "default"),
        },
      ],
    },
    {
      title: "通用设置",
      items: [
        {
          label: "消息通知",
          description: "接收应用推送通知",
          type: "toggle",
          checked: true,
        },
        {
          label: "语言",
          description: "简体中文",
          type: "link",
        },
      ],
    },
    {
      title: "隐私与安全",
      items: [
        {
          label: "隐私设置",
          description: "管理您的隐私偏好",
          type: "link",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center"
            >
              ‹
            </button>
            <h4 className="text-lg font-semibold">设置</h4>
          </div>
        </div>
      </div>

      {/* 设置内容 */}
      <div className="p-4 space-y-4">
        {settingGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm text-gray-500 font-medium mb-2 px-2">
              {group.title}
            </p>
            <div className="bg-white rounded-lg shadow-sm">
              {group.items.map((item, index) => (
                <div
                  key={item.label}
                  className={`p-4 ${
                    index !== group.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {item.type === "theme-selector" ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span>🎨</span>
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {/* 主题选择器 */}
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(themes).map(([key, config]) => {
                          if (key === "dark") return null;
                          return (
                            <button
                              key={key}
                              onClick={() => setTheme(key as any)}
                              className={`relative p-3 rounded-lg border-2 transition-all ${
                                theme === key
                                  ? "border-primary-500 bg-primary-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 rounded-full"
                                  style={{ backgroundColor: config.primary }}
                                />
                                <span className="text-xs font-medium">
                                  {config.name}
                                </span>
                              </div>
                              {theme === key && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-between ${
                        item.type === "link"
                          ? "cursor-pointer hover:bg-gray-50"
                          : ""
                      }`}
                      onClick={() => {
                        if (item.type === "link") {
                          alert(`点击了 ${item.label}`);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span>
                          {item.label === "深色模式" && "🌙"}
                          {item.label === "消息通知" && "🔔"}
                          {item.label === "语言" && "🌐"}
                          {item.label === "隐私设置" && "🛡️"}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.type === "toggle" ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={
                              item.type === "toggle" ? item.checked : false
                            }
                            onChange={(e) => {
                              if (item.type === "toggle" && item.onChange) {
                                item.onChange(e.target.checked);
                              }
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      ) : item.type === "link" ? (
                        <span className="text-gray-400">›</span>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 其他操作 */}
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
          <button
            onClick={handleClearCache}
            className="w-full py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            清理缓存
          </button>
          <button
            onClick={() => alert("当前版本: v1.0.0")}
            className="w-full py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            关于我们
          </button>
        </div>

        {/* 版本信息 */}
        <p className="text-xs text-gray-500 text-center mt-8">版本 1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;
