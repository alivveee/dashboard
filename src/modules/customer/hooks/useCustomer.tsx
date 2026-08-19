import { INITIAL_PACKAGES } from "../../package/hooks/usePackage";
import { Customer, CustomerFormData, StatusOption } from "../../client/types/Client.types";
import useClientManager from "../../../shared/hooks/useClientManager";

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Dimas Saputra",
    email: "dimas@example.com",
    phone: "081234567801",
    status: "active",
    packageId: "signature",
  },
  {
    id: "2",
    name: "Eka Putri",
    email: "eka@example.com",
    phone: "081234567802",
    status: "active",
    packageId: "lite",
  },
  {
    id: "3",
    name: "Fajar Ramadhan",
    email: "fajar@example.com",
    phone: "081234567803",
    status: "blocked",
    packageId: "dedicated",
  },
];

const emptyForm: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  packageId: INITIAL_PACKAGES[0].id,
};

export const customerStatusOptions: StatusOption<Customer["status"]>[] = [
  { value: "active", label: "Active", badgeClass: "text-bg-success" },
  { value: "blocked", label: "Blocked", badgeClass: "text-bg-danger" },
];

const useCustomer = () =>
  useClientManager<Customer>({
    clientLabel: "Customer",
    storageKey: "gx-customers",
    initialItems: initialCustomers,
    emptyFormData: emptyForm,
  });

export default useCustomer;
