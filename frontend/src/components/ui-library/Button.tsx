import { Button } from "react-bootstrap";

export default function ButtonComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Button>{children}</Button>;
}
