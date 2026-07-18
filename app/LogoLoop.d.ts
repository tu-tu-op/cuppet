import type { ReactNode } from "react";

export type LogoItem = {
  node: ReactNode;
};

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  ariaLabel?: string;
};

export default function LogoLoop(props: LogoLoopProps): JSX.Element;
