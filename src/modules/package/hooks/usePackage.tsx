import useClientManager from "../../../shared/hooks/useClientManager";
import { PackageOption } from "../types/Package.types";

export const PACKAGES_KEY = "gx-packages";

export const INITIAL_PACKAGES: PackageOption[] = [
  { id: "lite", name: "Lite", speed: "100Mbps", price: 300000 },
  { id: "signature", name: "Signature", speed: "100Mbps", price: 600000 },
  { id: "dedicated", name: "Dedicated", speed: "100Mbps", price: 1000000 },
];

const emptyForm: Omit<PackageOption, "id"> = {
  name: "",
  speed: "",
  price: 0,
};

const usePackage = () => {
  const manager = useClientManager<PackageOption>({
    clientLabel: "Paket",
    storageKey: PACKAGES_KEY,
    initialItems: INITIAL_PACKAGES,
    emptyFormData: emptyForm,
  });

  return { ...manager, packages: manager.items };
};

export default usePackage;
