import type { ReactNode } from "react";

interface PageHeaderAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  action?: PageHeaderAction;
  actions?: ReactNode;
}

const PageHeader = ({ title, action, actions }: PageHeaderProps) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <h3 className="text-body h5">{title}</h3>

      {actions}

      {!actions && action && (
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
