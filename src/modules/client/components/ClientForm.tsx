import type { FormEvent } from "react";
import { formatCurrency } from "../../../shared/helpers/format";
import { INITIAL_PACKAGES, PACKAGES_KEY } from "../../package/hooks/usePackage";
import useForm from "../../../shared/hooks/useForm";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { ClientFormData, StatusOption } from "../types/Client.types";
import { PackageOption } from "../../package/types/Package.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormSelect from "../../../shared/components/form/FormSelect";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
  OffcanvasSectionLabel,
} from "../../../shared/components/OffcanvasPanel";
import { IconMail, IconPhone } from "../../../shared/components/icons/Icons";

interface ClientFormActions<TFormData> {
  onSubmit: (data: TFormData) => void;
  onCancel: () => void;
}

interface ClientFormProps<TFormData extends ClientFormData> {
  initialValues: TFormData;
  clientLabel: string;
  namePrefix: string;
  statusOptions: StatusOption[];
  actions: ClientFormActions<TFormData>;
  isEditing: boolean;
  isLoading: boolean;
}

function ClientForm<TFormData extends ClientFormData>({
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  actions: { onSubmit, onCancel },
  isEditing,
  isLoading,
}: ClientFormProps<TFormData>) {
  const { __values, __handleChange } = useForm(initialValues);
  const [packages] = useLocalStorage<PackageOption[]>(
    PACKAGES_KEY,
    INITIAL_PACKAGES,
  );

  const _setField = (field: keyof TFormData, value: string) => {
    __handleChange(field, value as TFormData[keyof TFormData]);
  };

  const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(__values);
  };

  return (
    <form onSubmit={_handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasPanelHeader
        title={isEditing ? `Edit ${clientLabel}` : `Add ${clientLabel}`}
        onClose={onCancel}
      />

      <OffcanvasPanelBody>
        <OffcanvasSectionLabel>Personal Data</OffcanvasSectionLabel>

        <FormInput
          id={`${namePrefix}-name`}
          label="Name"
          placeholder={`Enter ${namePrefix} name here`}
          value={__values.name}
          onChange={(value) => _setField("name", value)}
          isRequired
        />

        <FormInput
          id={`${namePrefix}-email`}
          label="Email"
          type="email"
          placeholder="name@email.com"
          value={__values.email}
          onChange={(value) => _setField("email", value)}
          icon={<IconMail />}
          isRequired
        />

        <FormInput
          id={`${namePrefix}-phone`}
          label="Phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={__values.phone}
          onChange={(value) => _setField("phone", value)}
          icon={<IconPhone />}
          isRequired
        />

        <br />

        <OffcanvasSectionLabel>Subscription</OffcanvasSectionLabel>

        <FormSelect
          id={`${namePrefix}-package`}
          label="Package"
          placeholder="Select package"
          value={__values.packageId}
          onChange={(value) => _setField("packageId", value)}
          options={packages.map((pkg) => ({
            value: pkg.id,
            label: `${pkg.name} ${pkg.speed} - ${formatCurrency(pkg.price)}/month`,
          }))}
        />

        <FormSelect
          id={`${namePrefix}-status`}
          label="Status"
          placeholder="Select status"
          value={__values.status}
          onChange={(value) => _setField("status", value)}
          options={statusOptions}
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
}

export default ClientForm;
