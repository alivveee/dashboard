import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { PackageOption } from "../types/Package.types";
import FormInput from "../../../shared/components/form/FormInput";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
} from "../../../shared/components/OffcanvasPanel";

interface PackageFormProps {
  initialValues: Omit<PackageOption, "id">;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: Omit<PackageOption, "id">) => void;
  onCancel: () => void;
}

const PackageForm = ({
  initialValues,
  isEditing,
  isLoading,
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
    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasPanelHeader
        title={isEditing ? "Edit Package" : "Add Package"}
        onClose={onCancel}
      />

      <OffcanvasPanelBody>
        <FormInput
          id="package-name"
          label="Package Name"
          placeholder="Enter package name here"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          isRequired
        />

        <FormInput
          id="package-speed"
          label="Speed"
          placeholder="Example: 100Mbps"
          value={values.speed}
          onChange={(value) => handleChange("speed", value)}
          isRequired
        />

        <FormInput
          id="package-price"
          label="Price per Month"
          type="number"
          placeholder="Example: 300000"
          value={values.price}
          onChange={(value) => handleChange("price", value)}
          isRequired
        />
      </OffcanvasPanelBody>

      <OffcanvasFormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add"}
      />
    </form>
  );
};

export default PackageForm;
