import type { ReactNode } from "react";

interface OffcanvasPanelHeaderProps {
  title: string;
  onClose: () => void;
}

export const OffcanvasPanelHeader = ({
  title,
  onClose,
}: OffcanvasPanelHeaderProps) => (
  <div className="offcanvas-header">
    <h5 className="offcanvas-title fw-bold">{title}</h5>

    <button
      type="button"
      className="btn-close"
      aria-label="Close"
      onClick={onClose}
    />
  </div>
);

interface OffcanvasPanelBodyProps {
  children: ReactNode;
  className?: string;
}

export const OffcanvasPanelBody = ({
  children,
  className,
}: OffcanvasPanelBodyProps) => (
  <div className={`offcanvas-body${className ? ` ${className}` : ""}`}>
    {children}
  </div>
);

interface OffcanvasPanelFooterProps {
  children: ReactNode;
}

export const OffcanvasPanelFooter = ({
  children,
}: OffcanvasPanelFooterProps) => (
  <div className="d-flex justify-content-end gap-2 border-top p-3 mt-3">
    {children}
  </div>
);

interface OffcanvasFormHeaderProps {
  title: string;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: ReactNode;
  cancelLabel?: string;
}

export const OffcanvasFormHeader = ({
  title,
  onCancel,
  isLoading,
  submitLabel,
  cancelLabel = "Cancel",
}: OffcanvasFormHeaderProps) => (
  <div className="offcanvas-header">
    <h5 className="offcanvas-title fw-bold">{title}</h5>

    <div className="d-flex gap-2 ms-auto">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelLabel}
      </button>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {submitLabel}
      </button>
    </div>
  </div>
);

interface OffcanvasSectionLabelProps {
  children: ReactNode;
}

export const OffcanvasSectionLabel = ({
  children,
}: OffcanvasSectionLabelProps) => (
  <h6 className="text-uppercase text-muted fs-6 fw-semibold mb-2">
    {children}
  </h6>
);
