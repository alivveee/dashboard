import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { ProfileFormData } from "../hooks/useProfile";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import {
  IconMail,
  IconPhone,
} from "../../../shared/components/icons/Icons";

const genderOptions = [
  { value: "L", label: "Male" },
  { value: "P", label: "Female" },
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
          label="Name"
          placeholder="Enter your name here"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          isRequired
        />

        <FormInput
          id="profile-email"
          label="Email"
          type="email"
          placeholder="name@email.com"
          value={values.email}
          onChange={(value) => handleChange("email", value)}
          icon={<IconMail />}
          isRequired
        />

        <FormInput
          id="profile-phone"
          label="Phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={values.phone}
          onChange={(value) => handleChange("phone", value)}
          icon={<IconPhone />}
          isRequired
        />

        <FormInput
          id="profile-address"
          label="Address"
          placeholder="Enter address here"
          value={values.address}
          onChange={(value) => handleChange("address", value)}
          isRequired
        />

        <FormInput
          id="profile-birthday"
          label="Date of Birth"
          type="date"
          value={values.birthday}
          onChange={(value) => handleChange("birthday", value)}
          isRequired
        />

        <FormSelect
          id="profile-gender"
          label="Gender"
          placeholder="Select gender"
          value={values.gender}
          onChange={(value) => handleChange("gender", value)}
          options={genderOptions}
          isRequired
        />

        <PasswordInput
          value={values.password}
          onChange={(value) => handleChange("password", value)}
          label="New Password"
          placeholder="Leave blank to keep current password"
          isRequired={false}
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
