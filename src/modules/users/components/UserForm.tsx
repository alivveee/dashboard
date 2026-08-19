import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import useRoles from "../../roles/hooks/useRoles";
import { User } from "../types/User.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import PasswordInput from "../../../shared/components/form/PasswordInput";

const genderOptions = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

interface UserFormProps {
  initialValues: Omit<User, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserForm = ({
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: UserFormProps) => {
  const { values, handleChange } = useForm(initialValues);
  const roles = useRoles();
  const roleOptions = roles.map((role) => ({ value: role.id, label: role.name }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title">
          {isEditing ? "Edit User" : "Tambah User"}
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
          id="user-name"
          label="Nama"
          placeholder="Tulis nama user disini"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <FormInput
          id="user-email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={values.email}
          onChange={(value) => handleChange("email", value)}
          required
        />

        <FormInput
          id="user-address"
          label="Alamat"
          placeholder="Tulis alamat disini"
          value={values.address}
          onChange={(value) => handleChange("address", value)}
          required
        />

        <FormInput
          id="user-birthday"
          label="Tanggal Lahir"
          type="date"
          value={values.birthday}
          onChange={(value) => handleChange("birthday", value)}
          required
        />

        <FormSelect
          id="user-gender"
          label="Jenis Kelamin"
          placeholder="Pilih jenis kelamin"
          value={values.gender}
          onChange={(value) => handleChange("gender", value)}
          options={genderOptions}
          required
        />

        <PasswordInput
          value={values.password}
          onChange={(value) => handleChange("password", value)}
        />

        <FormSelect
          id="user-role"
          label="Role"
          placeholder="Pilih role"
          value={values.role}
          onChange={(value) => handleChange("role", value)}
          options={roleOptions}
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

export default UserForm;
