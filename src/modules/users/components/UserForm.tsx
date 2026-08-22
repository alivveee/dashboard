import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import useRoles from "../../roles/hooks/useRoles";
import { User } from "../types/User.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import {
  OffcanvasFormHeader,
  OffcanvasPanelBody,
  OffcanvasSectionLabel,
} from "../../../shared/components/OffcanvasPanel";
import {
  IconMail,
  IconMapPin,
  IconCalendar,
} from "../../../shared/components/icons/Icons";

const genderOptions = [
  { value: "L", label: "Male" },
  { value: "P", label: "Female" },
];

interface UserFormProps {
  initialValues: Omit<User, "id">;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserForm = ({
  initialValues,
  isEditing,
  isLoading,
  onSubmit,
  onCancel,
}: UserFormProps) => {
  const { values, handleChange } = useForm(initialValues);
  const roles = useRoles();
  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasFormHeader
        title={isEditing ? "Edit User" : "Add User"}
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={
          isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add"
        }
      />

      <OffcanvasPanelBody>
        <OffcanvasSectionLabel>Personal Information</OffcanvasSectionLabel>

        <FormInput
          id="user-name"
          label="Name"
          placeholder="Enter user name here"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          isRequired
        />

        <div className="row g-2">
          <div className="col-md-6">
            <FormInput
              id="user-birthday"
              label="Date of Birth"
              type="date"
              value={values.birthday}
              onChange={(value) => handleChange("birthday", value)}
              icon={<IconCalendar />}
              isRequired
            />
          </div>

          <div className="col-md-6">
            <div className="mb-2">
              <label className="form-label d-block">Gender</label>

              <div className="d-flex gap-3">
                {genderOptions.map((option) => (
                  <div className="form-check" key={option.value}>
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`user-gender-${option.value}`}
                      name="user-gender"
                      checked={values.gender === option.value}
                      onChange={() => handleChange("gender", option.value)}
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`user-gender-${option.value}`}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FormInput
          id="user-address"
          label="Address"
          placeholder="Enter address here"
          value={values.address}
          onChange={(value) => handleChange("address", value)}
          icon={<IconMapPin />}
          isRequired
        />

        <br />

        <OffcanvasSectionLabel>Account Access</OffcanvasSectionLabel>

        <div className="row g-2">
          <div className="col-md-6">
            <FormInput
              id="user-email"
              label="Email"
              type="email"
              placeholder="name@email.com"
              value={values.email}
              onChange={(value) => handleChange("email", value)}
              icon={<IconMail />}
              isRequired
            />
          </div>

          <div className="col-md-6">
            <FormSelect
              id="user-role"
              label="Role"
              placeholder="Select role"
              value={values.role}
              onChange={(value) => handleChange("role", value)}
              options={roleOptions}
              isRequired
            />
          </div>
        </div>

        <PasswordInput
          value={values.password}
          onChange={(value) => handleChange("password", value)}
        />
      </OffcanvasPanelBody>
    </form>
  );
};

export default UserForm;
