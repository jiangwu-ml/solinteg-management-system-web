# Solinteg Management System Web — 开发规范

> 本文档同时面向人类开发者与 AI 助手。新增页面、组件、样式或状态时，请先阅读并遵守本文约定。
>
> **约束唯一来源：** 所有开发约束、目录约定、命名规范只维护在本文件（`DEVELOPMENT.md`）。禁止在 `src/**` 等子目录再散落 `README.md` 描述规范；根目录 `README.md` 仅作项目简介与启动说明，并链接到本文。

## 1. 技术栈

| 类别       | 选型                                     |
| ---------- | ---------------------------------------- |
| 框架       | React 19 + TypeScript                    |
| 构建       | Vite                                     |
| UI         | Ant Design（优先使用成熟组件，少造轮子） |
| 路由       | React Router（支持嵌套多级路由）         |
| 服务端状态 | TanStack Query（React Query）            |
| 客户端状态 | Zustand（仅少量纯前端全局状态）          |
| 样式       | SCSS + CSS Modules（`*.module.scss`）    |

路径别名：`@/` → `src/`

---

## 2. 目录总览

```text
src/
  api/                    # 接口请求（含 mock），按领域拆分
  assets/                 # 图片、icon 等静态资源
  components/             # 全局通用组件（多页面复用）
    styles/               # 全局组件样式（与组件文件同名）
  hooks/                  # 可复用 hooks（跨页面）
  pages/                  # 页面：一律用文件夹包裹
  providers/              # 全局 Provider（如 QueryClient）
  router/                 # 路由配置
  stores/                 # Zustand store
  styles/                 # 全局 SCSS 变量 / mixin（非模块样式）
  types/                  # 共享 TypeScript 类型
  utils/                  # 通用工具方法
  app.tsx
  main.tsx
  index.scss              # 全局基础样式
```

---

## 3. 命名规范（硬规则）

| 对象                                 | 约定           | 示例                            |
| ------------------------------------ | -------------- | ------------------------------- |
| 源码文件（`.ts` / `.tsx` / `.scss`） | camelCase      | `loginPage.tsx`、`authStore.ts` |
| 资源文件（`src/assets/`）            | 小写 + `-`     | `logo-mark.svg`                 |
| 页面目录                             | kebab-case     | `encoding-list/`                |
| React 组件 / 页面导出                | PascalCase     | `export function LoginPage`     |
| hook / store 导出                    | camelCase      | `useLogin`、`useAuthStore`      |
| 样式模块                             | 与所属文件同名 | `loginPage.module.scss`         |

例外：`index.ts(x|scss)` 允许；SCSS partial 可带 `_`（如 `_variables.scss`）。导入跨目录用 `@/`，同目录用 `./`。

---

## 4. 页面（Pages）

### 4.1 基本规则

1. **每个 page 必须用独立文件夹包裹**，禁止 `pages/fooPage.tsx` 这种单文件平铺。
2. **页面样式与页面同目录**：`xxxPage.tsx` 与 `xxxPage.module.scss` 放在同一文件夹。
3. 页面文件夹名可用 kebab-case；页面**文件名**小驼峰，导出组件名 PascalCase + `Page` 后缀。
4. 路由只引用 page 组件，不在路由文件里堆业务逻辑。

### 4.2 单层页面示例

```text
src/pages/
  login/
    loginPage.tsx
    loginPage.module.scss
  hello/
    helloPage.tsx
    helloPage.module.scss
```

### 4.3 多级路由 / 多层级页面

路由层级与目录层级保持一致。父级业务域下可放置该域专用的 `components/`。

```text
src/pages/
  encoding/                          # 业务父级（对应 /encoding/*）
    components/                      # 仅 encoding 域内复用的组件
      encodingFieldTable.tsx
      styles/
        encodingFieldTable.module.scss
    list/
      encodingListPage.tsx
      encodingListPage.module.scss
    detail/
      encodingDetailPage.tsx
      encodingDetailPage.module.scss
```

对应路由示意：

```ts
{
  path: '/encoding',
  children: [
    { path: 'list', element: <EncodingListPage /> },
    { path: 'detail/:id', element: <EncodingDetailPage /> },
  ],
}
```

**判断组件放哪：**

| 复用范围                 | 放置位置                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| ≥ 2 个无关业务页面       | `src/components/`                                                 |
| 仅某一业务父级及其子页面 | `src/pages/<parent>/components/`                                  |
| 仅当前单个页面           | 留在该 page 文件内，或同目录下的局部子组件（不建全局 components） |

---

## 5. 组件（Components）

### 5.1 全局通用组件 — `src/components/`

- 多页面、跨业务复用的 UI / 逻辑组件放这里（如鉴权守卫、通用空状态、通用表格封装等）。
- 组件文件：`src/components/authGuard.tsx`（复杂时可升级为 `authGuard/index.tsx`）。
- **样式不与 tsx 同目录**，统一放到：

```text
src/components/styles/authGuard.module.scss
```

- 组件内引用示例：

```ts
import styles from "@/components/styles/authGuard.module.scss";
```

### 5.2 页面域组件 — `src/pages/<parent>/components/`

- 结构镜像全局约定：组件在 `components/`，样式在 `components/styles/`，文件名均为小驼峰。
- 禁止把仅域内使用的组件塞进 `src/components/`，避免全局目录膨胀。

---

## 6. 样式（Styles）

1. **页面样式**：与 page 同文件夹，`xxxPage.module.scss`。
2. **全局组件样式**：`src/components/styles/*.module.scss`。
3. **页面域组件样式**：`src/pages/<parent>/components/styles/*.module.scss`。
4. **全局变量 / mixin**：`src/styles/`（如 `_variables.scss`），通过 `@use '@/styles/variables' as *;` 引入。
5. **全局重置 / 基础样式**：`src/index.scss`。
6. 优先 CSS Modules；避免无必要的全局类名污染。
7. UI 尽量用 Ant Design 组件与 token；自定义样式只补布局与品牌差异。

---

## 7. 静态资源（Assets）

- 目录：`src/assets/`
- 命名：全小写，单词用 `-` 连接（见 §3.2）
- 在代码中通过 `import logo from '@/assets/logo-mark.svg'` 或打包器支持的方式引用

---

## 8. 工具方法（Utils）

- 目录：`src/utils/`
- 放置与业务无关、可多处复用的纯函数（如 `delay.ts`）
- 文件名小驼峰；按职责拆分，避免巨型 `utils.ts`
- 不要把 React hooks 放这里（hooks 放 `src/hooks/`）

---

## 9. 状态管理

### 9.1 TanStack Query — 所有后端接口数据

- 列表、详情、提交、登录等 **凡涉及服务端数据**，一律用 Query / Mutation。
- 负责：缓存、重试、Loading、失效刷新等。
- 请求函数放 `src/api/`；组合逻辑可放 `src/hooks/`（如 `useLogin.ts`）。

```ts
// ✅ 接口数据
useQuery({ queryKey: ['encodings'], queryFn: fetchEncodings })
useMutation({ mutationFn: loginApi, onSuccess: ... })
```

### 9.2 Zustand — 少量纯前端全局状态

- 仅存 **与后端无关** 的全局 UI / 会话侧状态，例如：侧边栏折叠、主题偏好、本地持久化的 token 与「记住密码」。
- **不要**用 Zustand 缓存接口列表/详情（那是 Query 的职责）。
- store 放 `src/stores/`，需要持久化时用 `persist`（localStorage）。

```ts
// ✅ 前端全局
useAuthStore(); // token / user / 记住密码
useAppStore(); // sidebarCollapsed 等

// ❌ 不要
useEncodingListStore(); // 应从 useQuery 获取
```

### 9.3 职责边界（给 AI 的硬规则）

1. 新增接口数据 → 写 `api` + `useQuery` / `useMutation`，不要新建 Zustand store。
2. 新增跨页 UI 开关 / 本地偏好 → 才考虑 Zustand。
3. Token 等登录态：允许 Zustand + 本地持久化；接口返回的业务实体仍走 Query。

---

## 10. 路由

- 统一在 `src/router/index.tsx`（后续可按业务拆子路由模块再聚合）。
- 使用嵌套路由表达布局与鉴权（如 `RequireAuth` + `<Outlet />`）。
- 页面路径与 `src/pages/` 目录层级对齐，便于定位。

---

## 11. 当前已有结构（快照）

```text
src/
  assets/                   # 静态资源（命名：小写 + -）
  utils/
    delay.ts
  components/
    authGuard.tsx
    styles/                 # 全局组件样式目录（已预留）
  pages/
    hello/
      helloPage.tsx
      helloPage.module.scss
    login/
      loginPage.tsx
      loginPage.module.scss
  stores/
    appStore.ts
    authStore.ts
  hooks/
    useLogin.ts
  api/
    auth.ts
  providers/
    queryProvider.tsx
  app.tsx
  main.tsx
```

---

## 12. AI / 协作检查清单

新增功能前请自检：

- [ ] 新源码文件是否为小驼峰？资源文件是否为小写 + `-`？
- [ ] 新页面是否放在 `pages/<folder>/`，且样式同目录？
- [ ] 组件是全局复用还是页面域复用？目录是否选对？
- [ ] 全局组件样式是否在 `components/styles/` 且文件名小驼峰？
- [ ] 通用纯函数是否放在 `utils/`，hooks 是否放在 `hooks/`？
- [ ] 接口数据是否走 TanStack Query，而不是 Zustand？
- [ ] 是否优先使用 Ant Design 现成组件？
- [ ] 样式是否为 SCSS Module，并复用 `src/styles` 变量？
- [ ] 是否把新约定写进 `DEVELOPMENT.md`，而不是在子目录新建 README？
