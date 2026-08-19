export type AlertVariant = "success" | "danger" | "warning" | "info";

const ALERT_DURATION = 3000;

let container: HTMLDivElement | null = null;

const getContainer = () => {
  if (container) return container;

  container = document.createElement("div");
  container.className = "position-fixed top-0 end-0 p-3";
  container.style.zIndex = "1080";
  document.body.append(container);

  return container;
};

export const showAlert = (
  message: string,
  variant: AlertVariant = "success",
) => {
  const alertEl = document.createElement("div");
  alertEl.className = `alert alert-${variant} alert-dismissible shadow-sm mb-2`;
  alertEl.setAttribute("role", "alert");
  alertEl.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "btn-close";
  closeBtn.setAttribute("aria-label", "Tutup");
  closeBtn.onclick = () => alertEl.remove();

  alertEl.append(closeBtn);
  getContainer().append(alertEl);

  setTimeout(() => alertEl.remove(), ALERT_DURATION);
};
