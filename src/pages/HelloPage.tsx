import { Card, Space, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

export function HelloPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 560 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>
            Hello, Solinteg
          </Title>
          <Paragraph style={{ margin: 0 }}>
            逆变器编码管理系统前端工程已就绪。业务功能（编码生成、参数维护等）后续补充。
          </Paragraph>
          <Text type="secondary">
            React · TypeScript · Vite · Ant Design · React Router · TanStack
            Query · Zustand
          </Text>
        </Space>
      </Card>
    </div>
  )
}
