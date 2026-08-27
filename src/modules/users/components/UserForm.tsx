import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import useRoles from "../../roles/hooks/useRoles";
import { UserFormData } from "../types/User.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
  OffcanvasSectionLabel,
} from "../../../shared/components/OffcanvasPanel";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
} from "../../../shared/components/icons/Icons";

const genderOptions = [
  { value: "L", label: "Male" },
  { value: "P", label: "Female" },
];

interface UserFormActions {
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

interface UserFormProps {
  initialValues: UserFormData;
  isEditing: boolean;
  isLoading: boolean;
  actions: UserFormActions;
}

const UserForm = ({
  initialValues,
  isEditing,
  isLoading,
  actions: { onSubmit, onCancel },
}: UserFormProps) => {
  const { __values, __handleChange } = useForm(initialValues);
  const roles = useRoles();
  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(__values);
  };

  return (
    <form onSubmit={_handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasPanelHeader
        title={isEditing ? "Edit User" : "Add User"}
        onClose={onCancel}
      />

      <OffcanvasPanelBody>
        <OffcanvasSectionLabel>Personal Information</OffcanvasSectionLabel>

        <FormInput
          id="user-name"
          label="Name"
          placeholder="Enter user name here"
          value={__values.name}
          onChange={(value) => __handleChange("name", value)}
          isRequired
        />

        <div className="row g-2">
          <div className="col-md-6">
            <FormInput
              id="user-birthday"
              label="Date of Birth"
              type="date"
              value={__values.birthday}
              onChange={(value) => __handleChange("birthday", value)}
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
                      checked={__values.gender === option.value}
                      onChange={() => __handleChange("gender", option.value)}
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
          value={__values.address}
          onChange={(value) => __handleChange("address", value)}
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
              value={__values.email}
              onChange={(value) => __handleChange("email", value)}
              icon={<IconMail />}
              isRequired
            />
          </div>

          <div className="col-md-6">
            <FormInput
              id="user-phone"
              label="Phone"
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={__values.phone}
              onChange={(value) => __handleChange("phone", value)}
              icon={<IconPhone />}
              isRequired
            />
          </div>
        </div>

        <PasswordInput
          value={__values.password}
          onChange={(value) => __handleChange("password", value)}
        />

        <br />

        <OffcanvasSectionLabel>Role</OffcanvasSectionLabel>

        <FormSelect
          id="user-role"
          label="Role"
          placeholder="Select role"
          value={__values.role}
          onChange={(value) => __handleChange("role", value)}
          options={roleOptions}
          isRequired
        />
      </OffcanvasPanelBody>

      <OffcanvasFormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={
          isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add"
        }
      />
    </form>
  );
};

export default UserForm;
