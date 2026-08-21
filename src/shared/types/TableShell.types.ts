import { ReactNode } from "react";

export type TableShellHeader =
  | string
  | { className?: string; content: ReactNode };

export type TableShellCell =
  | ReactNode
  | { className?: string; content: ReactNode };

export type TableShellRow = TableShellCell[];
