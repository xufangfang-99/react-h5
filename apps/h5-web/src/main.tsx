import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App.tsx";

// 引入 Mantine 样式
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// 引入 UnoCSS 样式
import "virtual:uno.css";

// 引入全局样式
import "@/styles/index.css";
import "@/styles/mobile.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        primaryColor: "blue",
        defaultRadius: "md",
        components: {
          Button: {
            defaultProps: {
              size: "md",
            },
          },
        },
      }}
    >
      <Notifications position="top-center" />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
