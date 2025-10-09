import { FC } from "react";

type TypographyType = "small" | "medium" | "large";

interface TypographyProps {
  text: string;
  type?: TypographyType;
}

const classNamesMap: Record<TypographyType, string> = {
  small: "",
  medium: "",
  large: "",
};

export const Typography: FC<TypographyProps> = ({ type = "medium", text }) => {
  const className = classNamesMap[type];

  return <span className={className}>{text}</span>;
};
