/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React from "react";
/**
 * `i` 番目を入力させるinputタグ
 */
export default function GetManySettings<T extends string | number>({
  type,
  items,
  setItems,
  i,
  className,
  min,
  placeholder,
}: {
  type: "string" | "number";
  items: T[];
  setItems: (value: T[]) => void;
  i: number;
  className?: string;
  min?: number;
  placeholder?: string;
}): JSX.Element {
  return (
    <input
      type={type === "string" ? "text" : "number"}
      className={className}
      min={min}
      placeholder={placeholder}
      value={items[i]}
      onChange={(e) => {
        setItems(
          // @ts-ignore
          items.map((item, j) =>
            i !== j
              ? item
              : type === "string"
              ? e.target.value
              : e.target.valueAsNumber,
          ),
        );
      }}
    />
  );
}
