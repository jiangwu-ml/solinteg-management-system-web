import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
import type { LoginParams } from "@/types/auth";

interface LoginFormValues extends LoginParams {
  remember: boolean;
}

export function useLogin() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const setAuth = useAuthStore(state => state.setAuth);
  const setRememberPassword = useAuthStore(state => state.setRememberPassword);

  return useMutation({
    mutationFn: (values: LoginFormValues) =>
      loginApi({
        username: values.username,
        password: values.password,
      }),
    onSuccess: (data, variables) => {
      setAuth({ token: data.token, user: data.user });
      setRememberPassword(variables.remember, {
        username: variables.username,
        password: variables.password,
      });
      message.success("登录成功");
      void navigate("/", { replace: true });
    },
    onError: (error: Error) => {
      message.error(error.message || "登录失败，请稍后重试");
    },
  });
}
