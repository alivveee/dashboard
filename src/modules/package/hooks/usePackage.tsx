import useClientManager from "../../client/hooks/useClientManager";
import { PackageOption, PackageFormData } from "../types/Package.types";

export const PACKAGES_KEY = "gx-packages";

export const INITIAL_PACKAGES: PackageOption[] = [
  { id: "lite", name: "Lite", speed: "100Mbps", price: 300000 },
  { id: "signature", name: "Signature", speed: "100Mbps", price: 600000 },
  { id: "dedicated", name: "Dedicated", speed: "100Mbps", price: 1000000 },
];

const emptyForm: PackageFormData = {
  name: "",
  speed: "",
  price: 0,
};

const usePackage = () => {
  const manager = useClientManager<PackageOption>({
    clientLabel: "Package",
    storageKey: PACKAGES_KEY,
    initialItems: INITIAL_PACKAGES,
    emptyFormData: emptyForm,
  });

  return { ...manager, __packages: manager.__items };
};

export default usePackage;
