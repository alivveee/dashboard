import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { PackageFormData } from "../types/Package.types";
import FormInput from "../../../shared/components/form/FormInput";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
} from "../../../shared/components/OffcanvasPanel";

interface PackageFormActions {
  onSubmit: (data: PackageFormData) => void;
  onCancel: () => void;
}

interface PackageFormProps {
  initialValues: PackageFormData;
  isEditing: boolean;
  isLoading: boolean;
  actions: PackageFormActions;
}

const PackageForm = ({
  initialValues,
  isEditing,
  isLoading,
  actions: { onSubmit, onCancel },
}: PackageFormProps) => {
  const { __values, __handleChange } = useForm({
    name: initialValues.name,
    speed: initialValues.speed,
    price: String(initialValues.price),
  });

  const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      name: __values.name,
      speed: __values.speed,
      price: Number(__values.price) || 0,
    });
  };

  return (
    <form onSubmit={_handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasPanelHeader
        title={isEditing ? "Edit Package" : "Add Package"}
        onClose={onCancel}
      />

      <OffcanvasPanelBody>
        <FormInput
          id="package-name"
          label="Package Name"
          placeholder="Enter package name here"
          value={__values.name}
          onChange={(value) => __handleChange("name", value)}
          isRequired
        />

        <FormInput
          id="package-speed"
          label="Speed"
          placeholder="Example: 100Mbps"
          value={__values.speed}
          onChange={(value) => __handleChange("speed", value)}
          isRequired
        />

        <FormInput
          id="package-price"
          label="Price per Month"
          type="number"
          placeholder="Example: 300000"
          value={__values.price}
          onChange={(value) => __handleChange("price", value)}
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
