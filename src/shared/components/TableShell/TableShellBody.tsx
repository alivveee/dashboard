import { ReactNode } from "react";
import { TableShellRow } from "./types";
import { isCellConfig } from "./table.helper";

interface TableShellBodyProps<T> {
  rows: T[];
  colSpan: number;
  emptyMessage: string;
  isLoading?: boolean;
  startIndex: number;
  children?: (rows: T[], startIndex: number) => ReactNode;
}

function TableShellBody<T>({
  rows,
  colSpan,
  emptyMessage,
  isLoading,
  startIndex,
  children,
}: TableShellBodyProps<T>) {
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={colSpan} className="text-center py-4">
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      ) : rows.length === 0 ? (
        <tr>
          <td colSpan={colSpan} className="text-center text-muted py-4">
            {emptyMessage}
          </td>
        </tr>
      ) : children ? (
        children(rows, startIndex)
      ) : (
        (rows as unknown as TableShellRow[]).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
              isCellConfig(cell) ? (
                <td key={cellIndex} className={cell.className}>
                  {cell.content}
                </td>
              ) : (
                <td key={cellIndex}>{cell}</td>
              ),
            )}
          </tr>
        ))
      )}
    </tbody>
  );
}

export default TableShellBody;
