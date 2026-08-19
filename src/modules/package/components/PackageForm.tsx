import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { PackageOption } from "../types/Package.types";
import FormInput from "../../../shared/components/form/FormInput";

interface PackageFormProps {
  initialValues: Omit<PackageOption, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<PackageOption, "id">) => void;
  onCancel: () => void;
}

const PackageForm = ({
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: PackageFormProps) => {
  const { values, handleChange } = useForm({
    name: initialValues.name,
    speed: initialValues.speed,
    price: String(initialValues.price),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      name: values.name,
      speed: values.speed,
      price: Number(values.price) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title">
          {isEditing ? "Edit Paket" : "Tambah Paket"}
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
          id="package-name"
          label="Nama Paket"
          placeholder="Tulis nama paket disini"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <FormInput
          id="package-speed"
          label="Kecepatan"
          placeholder="Contoh: 100Mbps"
          value={values.speed}
          onChange={(value) => handleChange("speed", value)}
          required
        />

        <FormInput
          id="package-price"
          label="Harga per Bulan"
          type="number"
          placeholder="Contoh: 300000"
          value={values.price}
          onChange={(value) => handleChange("price", value)}
          required
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
};

export default PackageForm;
