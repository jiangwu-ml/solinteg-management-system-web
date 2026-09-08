import { App as AntdApp, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "@/providers/query-provider";
import { router } from "@/router";

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
