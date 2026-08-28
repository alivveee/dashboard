import { IconSearch } from "../icons/Icons";

interface TableSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}

const TableSearchBox = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  className,
}: TableSearchBoxProps) => (
  <form
    className={`input-group input-group-sm ${className ?? ""}`.trim()}
    style={{ maxWidth: 280 }}
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit?.();
    }}
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
  </form>
);

export default TableSearchBox;
