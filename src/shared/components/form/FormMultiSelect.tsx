import { toggleInArray } from "../../helpers/array.helper";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  id: string;
  label: string;
  value: string[];
  options: MultiSelectOption[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  isRequired?: boolean;
  maxChips?: number;
}

const FormMultiSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select options",
  isRequired = false,
  maxChips = 3,
}: FormMultiSelectProps) => {
  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  const visibleOptions = selectedOptions.slice(0, maxChips);
  const hiddenCount = selectedOptions.length - visibleOptions.length;

  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <div className="dropdown">
        <button
          id={id}
          type="button"
          className="form-select text-start d-flex flex-wrap align-items-center gap-1"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-required={isRequired}
        >
          {selectedOptions.length > 0 ? (
            <>
              {visibleOptions.map((option) => (
                <span
                  key={option.value}
                  className="badge rounded-pill fw-normal text-bg-light border"
                >
                  {option.label}
                </span>
              ))}

              {hiddenCount > 0 ? (
                <span className="badge rounded-pill fw-normal text-bg-secondary">
                  +{hiddenCount}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </button>

        <ul
          className="dropdown-menu w-100"
          style={{ maxHeight: "16rem", overflowY: "auto" }}
        >
          {options.length === 0 ? (
            <li>
              <span className="dropdown-item-text text-muted">No options</span>
            </li>
          ) : null}

          {options.map((option) => (
            <li key={option.value}>
              <label className="dropdown-item d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input m-0"
                  checked={value.includes(option.value)}
                  onChange={() => onChange(toggleInArray(value, option.value))}
                />
                {option.label}
              </label>
            </li>
          ))}

          {value.length > 0 ? (
            <>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  type="button"
                  className="dropdown-item text-danger"
                  onClick={() => onChange([])}
                >
                  Clear selection
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default FormMultiSelect;
