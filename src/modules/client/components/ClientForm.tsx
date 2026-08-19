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
  loading: boolean;
}

function ClientForm<TFormData extends ClientFormData>({
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  onSubmit,
  onCancel,
  isEditing,
  loading,
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
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title">
          {isEditing ? `Edit ${clientLabel}` : `Tambah ${clientLabel}`}
        </h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Tutup"
          onClick={onCancel}
        />
      </div>

      <div className="modal-body">
        <FormInput
          id={`${namePrefix}-name`}
          label="Nama"
          placeholder={`Tulis nama ${namePrefix} disini`}
          value={values.name}
          onChange={(value) => setField("name", value)}
          required
        />

        <FormInput
          id={`${namePrefix}-email`}
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={values.email}
          onChange={(value) => setField("email", value)}
          required
        />

        <FormInput
          id={`${namePrefix}-phone`}
          label="Telepon"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={values.phone}
          onChange={(value) => setField("phone", value)}
          required
        />

        <FormSelect
          id={`${namePrefix}-package`}
          label="Paket"
          placeholder="Pilih paket"
          value={values.packageId}
          onChange={(value) => setField("packageId", value)}
          options={packages.map((pkg) => ({
            value: pkg.id,
            label: `${pkg.name} ${pkg.speed} - ${formatCurrency(pkg.price)}/bulan`,
          }))}
        />

        <FormSelect
          id={`${namePrefix}-status`}
          label="Status"
          placeholder="Pilih status"
          value={values.status}
          onChange={(value) => setField("status", value)}
          options={statusOptions}
        />
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </button>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah"}
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
