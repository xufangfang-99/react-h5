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
      description: "现代化移动端应用开发框架",
      url: window.location.origin,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CNY",
      },
      author: {
        "@type": "Organization",
        name: "Your Company",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
