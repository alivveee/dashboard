import { INITIAL_PACKAGES } from "../../package/hooks/usePackage";
import {
  Customer,
  CustomerFormData,
  StatusOption,
} from "../../client/types/Client.types";
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
  {
    id: "4",
    name: "Gilang Pratama",
    email: "gilang@example.com",
    phone: "081234567804",
    status: "active",
    packageId: "lite",
  },
  {
    id: "5",
    name: "Hana Maharani",
    email: "hana@example.com",
    phone: "081234567805",
    status: "active",
    packageId: "signature",
  },
  {
    id: "6",
    name: "Ilham Setiawan",
    email: "ilham@example.com",
    phone: "081234567806",
    status: "blocked",
    packageId: "dedicated",
  },
  {
    id: "7",
    name: "Joko Susanto",
    email: "joko@example.com",
    phone: "081234567807",
    status: "active",
    packageId: "signature",
  },
  {
    id: "8",
    name: "Kartika Sari",
    email: "kartika@example.com",
    phone: "081234567808",
    status: "active",
    packageId: "lite",
  },
  {
    id: "9",
    name: "Lukman Hakim",
    email: "lukman@example.com",
    phone: "081234567809",
    status: "active",
    packageId: "dedicated",
  },
  {
    id: "10",
    name: "Maya Lestari",
    email: "maya@example.com",
    phone: "081234567810",
    status: "blocked",
    packageId: "signature",
  },
  {
    id: "11",
    name: "Nanda Prakoso",
    email: "nanda@example.com",
    phone: "081234567811",
    status: "active",
    packageId: "lite",
  },
  {
    id: "12",
    name: "Olivia Permata",
    email: "olivia@example.com",
    phone: "081234567812",
    status: "active",
    packageId: "signature",
  },
  {
    id: "13",
    name: "Putra Wijaya",
    email: "putra@example.com",
    phone: "081234567813",
    status: "blocked",
    packageId: "dedicated",
  },
  {
    id: "14",
    name: "Rina Anggraini",
    email: "rina@example.com",
    phone: "081234567814",
    status: "active",
    packageId: "lite",
  },
  {
    id: "15",
    name: "Satria Nugraha",
    email: "satria@example.com",
    phone: "081234567815",
    status: "active",
    packageId: "signature",
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
