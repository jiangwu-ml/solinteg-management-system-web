import type { LoginParams, LoginResult } from "@/types/auth";
import { delay } from "@/utils/delay";

const MOCK_USERS = [
  {
    username: "admin",
    password: "123456",
    id: "1",
    displayName: "系统管理员",
  },
  {
    username: "solinteg",
    password: "solinteg",
    id: "2",
    displayName: "Solinteg 用户",
  },
] as const;

/** Mock 登录接口，后续可替换为真实 HTTP 请求 */
export async function loginApi(params: LoginParams): Promise<LoginResult> {
  await delay(600);

  const matched = MOCK_USERS.find(
    item =>
      item.username === params.username.trim() &&
      item.password === params.password,
  );

  if (!matched) {
    throw new Error("用户名或密码错误");
  }

  return {
    token: `mock-token-${matched.id}-${Date.now()}`,
    user: {
      id: matched.id,
      username: matched.username,
      displayName: matched.displayName,
    },
  };
}
