import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { ProfileFormData } from "../hooks/useProfile";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import PasswordInput from "../../../shared/components/form/PasswordInput";

const genderOptions = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

interface ProfileFormProps {
  initialValues: ProfileFormData;
  roleLabel: string;
  onSubmit: (data: ProfileFormData) => void;
}

const ProfileForm = ({ initialValues, roleLabel, onSubmit }: ProfileFormProps) => {
  const { values, handleChange } = useForm(initialValues);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <FormInput
          id="profile-name"
          label="Nama"
          placeholder="Tulis nama Anda disini"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <FormInput
          id="profile-email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={values.email}
          onChange={(value) => handleChange("email", value)}
          required
        />

        <FormInput
          id="profile-address"
          label="Alamat"
          placeholder="Tulis alamat disini"
          value={values.address}
          onChange={(value) => handleChange("address", value)}
          required
        />

        <FormInput
          id="profile-birthday"
          label="Tanggal Lahir"
          type="date"
          value={values.birthday}
          onChange={(value) => handleChange("birthday", value)}
          required
        />

        <FormSelect
          id="profile-gender"
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
          label="Password Baru"
          placeholder="Kosongkan jika tidak ingin mengubah password"
          required={false}
        />

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input className="form-control" value={roleLabel} disabled />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
