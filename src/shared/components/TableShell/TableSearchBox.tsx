import { IconSearch } from "../icons/Icons";

interface TableSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TableSearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: TableSearchBoxProps) => (
  <div
    className={`input-group input-group-sm ${className ?? ""}`.trim()}
    style={{ maxWidth: 280 }}
  >
    <span className="input-group-text bg-body border-end-0">
      <IconSearch className="text-muted" />
    </span>
    <input
      type="text"
      className="form-control border-start-0"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export default TableSearchBox;
