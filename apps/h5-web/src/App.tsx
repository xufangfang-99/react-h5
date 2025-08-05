import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // 添加结构化数据
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "React H5 Web",
      description: "现代化移动端应用",
      url: window.location.origin,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
    });
    document.head.appendChild(script);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
