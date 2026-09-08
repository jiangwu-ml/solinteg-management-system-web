import { Button, Card, Descriptions, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import styles from "./helloPage.module.scss";

const { Title, Paragraph, Text } = Typography;

export function HelloPage() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    void navigate("/login", { replace: true });
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={2} className={styles.title}>
            Hello, Solinteg
          </Title>
          <Paragraph className={styles.desc}>
            登录成功。业务功能（编码生成、参数维护等）后续补充。
          </Paragraph>

          <Descriptions
            bordered
            size="small"
            column={1}
            items={[
              {
                key: "name",
                label: "当前用户",
                children: user?.displayName ?? "-",
              },
              {
                key: "username",
                label: "用户名",
                children: user?.username ?? "-",
              },
              {
                key: "token",
                label: "Token",
                children: (
                  <Text ellipsis className={styles.token} copyable>
                    {token ?? "-"}
                  </Text>
                ),
              },
            ]}
          />

          <Button onClick={handleLogout}>退出登录</Button>
        </Space>
      </Card>
    </div>
  );
}
