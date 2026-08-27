import {
  StatusOption,
  Prospect,
  ProspectFormData,
} from "../../client/types/Client.types";
import useResourceManager from "../../../shared/hooks/useResourceManager";
import { INITIAL_PACKAGES } from "../../package/hooks/usePackage";

const initialProspects: Prospect[] = [
  {
    id: "1",
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: "081234567890",
    status: "pending",
    packageId: "lite",
  },
  {
    id: "2",
    name: "Bunga Anggraini",
    email: "bunga@example.com",
    phone: "081298765432",
    status: "completed",
    packageId: "signature",
  },
  {
    id: "3",
    name: "Chandra Kusuma",
    email: "chandra@example.com",
    phone: "081345678901",
    status: "pending",
    packageId: "dedicated",
  },
];

const emptyForm: ProspectFormData = {
  name: "",
  email: "",
  phone: "",
  status: "pending",
  packageId: INITIAL_PACKAGES[0].id,
};

export const prospectStatusOptions: StatusOption<Prospect["status"]>[] = [
  { value: "pending", label: "Pending", badgeClass: "text-bg-warning" },
  { value: "completed", label: "Completed", badgeClass: "text-bg-success" },
];

const useProspect = () =>
  useResourceManager<Prospect>({
    resourceLabel: "Prospect",
    storageKey: "gx-prospects",
    initialItems: initialProspects,
    emptyFormData: emptyForm,
  });

export default useProspect;
