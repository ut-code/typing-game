/**
 * 確定ボタンのコンポーネントです。
 * @param f `onClick` 用の関数
 */
export default function ConfirmButton({ f }: { f: () => void }): JSX.Element {
  return <button onClick={f}>確定</button>;
}
