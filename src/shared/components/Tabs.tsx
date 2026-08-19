import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  paramName?: string;
}

const Tabs = ({ items, defaultActiveKey, paramName = "tab" }: TabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlKey = searchParams.get(paramName);
  const fallbackKey = defaultActiveKey ?? items[0]?.key;
  const activeKey = items.some((item) => item.key === urlKey)
    ? (urlKey as string)
    : fallbackKey;

  const activeItem = items.find((item) => item.key === activeKey);

  const selectTab = (key: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(paramName, key);
        return next;
      },
      { replace: true },
    );
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3">
        {items.map((item) => (
          <li className="nav-item" key={item.key}>
            <button
              type="button"
              className={`nav-link d-flex align-items-center gap-2 ${
                activeKey === item.key ? "active text-primary fw-bold" : ""
              }`}
              onClick={() => selectTab(item.key)}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div>{activeItem?.content}</div>
    </div>
  );
};

export default Tabs;
