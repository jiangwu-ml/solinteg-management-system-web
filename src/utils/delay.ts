/**
 * 延迟指定毫秒后 resolve，常用于 mock / 动画衔接。
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
