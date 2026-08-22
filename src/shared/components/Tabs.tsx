import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  basePath: string;
  defaultActiveKey?: string;
}

const Tabs = ({ items, basePath, defaultActiveKey }: TabsProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fallbackKey = defaultActiveKey ?? items[0]?.key;
  const activeKey =
    items.find((item) => pathname === `${basePath}/${item.key}`)?.key ??
    fallbackKey;

  const activeItem = items.find((item) => item.key === activeKey);

  const selectTab = (key: string) => {
    navigate(`${basePath}/${key}`, { replace: true });
  };

  return (
    <>
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
    </>
  );
};

export default Tabs;
