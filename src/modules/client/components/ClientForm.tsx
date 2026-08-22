import type { FormEvent } from "react";
import { formatCurrency } from "../../../shared/helpers/format";
import {
  INITIAL_PACKAGES,
  PACKAGES_KEY,
} from "../../package/hooks/usePackage";
import useForm from "../../../shared/hooks/useForm";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { BaseClient, StatusOption } from "../types/Client.types";
import { PackageOption } from "../../package/types/Package.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";

interface ClientFormData extends Omit<BaseClient, "id"> {
  status: string;
}

interface ClientFormProps<TFormData extends ClientFormData> {
  initialValues: TFormData;
  clientLabel: string;
  namePrefix: string;
  statusOptions: StatusOption[];
  onSubmit: (data: TFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
  isLoading: boolean;
}

function ClientForm<TFormData extends ClientFormData>({
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  onSubmit,
  onCancel,
  isEditing,
  isLoading,
}: ClientFormProps<TFormData>) {
  const { values, handleChange } = useForm(initialValues);
  const [packages] = useLocalStorage<PackageOption[]>(
    PACKAGES_KEY,
    INITIAL_PACKAGES,
  );

  const setField = (field: keyof TFormData, value: string) => {
    handleChange(field, value as TFormData[keyof TFormData]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
          {isEditing ? `Edit ${clientLabel}` : `Add ${clientLabel}`}
        </h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onCancel}
        />
      </div>

      <div className="offcanvas-body">
        <FormInput
          id={`${namePrefix}-name`}
          label="Name"
          placeholder={`Enter ${namePrefix} name here`}
          value={values.name}
          onChange={(value) => setField("name", value)}
          isRequired
        />

        <FormInput
          id={`${namePrefix}-email`}
          label="Email"
          type="email"
          placeholder="name@email.com"
          value={values.email}
          onChange={(value) => setField("email", value)}
          isRequired
        />

        <FormInput
          id={`${namePrefix}-phone`}  
          label="Phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={values.phone}
          onChange={(value) => setField("phone", value)}
          isRequired
        />

        <FormSelect
          id={`${namePrefix}-package`}
          label="Package"
          placeholder="Select package"
          value={values.packageId}
          onChange={(value) => setField("packageId", value)}
          options={packages.map((pkg) => ({
            value: pkg.id,
            label: `${pkg.name} ${pkg.speed} - ${formatCurrency(pkg.price)}/month`,
          }))}
        />

        <FormSelect
          id={`${namePrefix}-status`}
          label="Status"
          placeholder="Select status"
          value={values.status}
          onChange={(value) => setField("status", value)}
          options={statusOptions}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 border-top p-3 mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
