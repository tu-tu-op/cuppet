import type { CSSProperties, Key, NamedExoticComponent, ReactNode } from "react";

type LogoNodeItem = {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

type LogoImageItem = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
};

export type LogoItem = LogoNodeItem | LogoImageItem;

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

export const LogoLoop: NamedExoticComponent<LogoLoopProps>;
export default LogoLoop;
