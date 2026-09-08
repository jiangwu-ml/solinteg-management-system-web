import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/stores/authStore";
import styles from "./loginPage.module.scss";

const { Title, Paragraph } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export function LoginPage() {
  const loginMutation = useLogin();
  const rememberPassword = useAuthStore(state => state.rememberPassword);
  const remembered = useAuthStore(state => state.remembered);

  const [form] = Form.useForm<LoginFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      username: remembered?.username ?? "",
      password: remembered?.password ?? "",
      remember: rememberPassword,
    });
  }, [form, rememberPassword, remembered]);

  const onFinish = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <Title level={2} className={styles.brandTitle}>
            Solinteg
          </Title>
          <Paragraph className={styles.brandDesc}>逆变器编码管理系统</Paragraph>
        </div>

        <Card className={styles.card} variant="borderless">
          <Title level={3} className={styles.formTitle}>
            账号登录
          </Title>
          <Paragraph type="secondary" className={styles.formHint}>
            请输入用户名和密码进入系统
          </Paragraph>

          <Alert
            type="info"
            showIcon
            className={styles.tip}
            message="演示账号：admin / 123456"
          />

          <Form
            form={form}
            layout="vertical"
            size="large"
            requiredMark={false}
            initialValues={{
              username: remembered?.username ?? "",
              password: remembered?.password ?? "",
              remember: rememberPassword,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                autoComplete="username"
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loginMutation.isPending}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
