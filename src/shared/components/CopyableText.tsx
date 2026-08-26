import { showAlert } from "../helpers/alert";

interface CopyableTextProps {
  text: string;
  className?: string;
}

const CopyableText = ({ text, className }: CopyableTextProps) => {
  const _handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert(`Copied "${text}" to clipboard.`);
    } catch {
      showAlert("Failed to copy to clipboard.", "danger");
    }
  };

  return (
    <span
      role="button"
      title="Click to copy"
      onClick={_handleCopy}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {text}
    </span>
  );
};

export default CopyableText;
