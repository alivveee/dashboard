import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { INITIAL_ROLES, ROLES_KEY } from "./useRole";
import { Role } from "../types/Role.types";

// Read-only view of the live roles list, for places that just need to
// display/select a role without pulling in useRole's CRUD/modal manager.
const useRoles = (): Role[] => {
  const [roles] = useLocalStorage<Role[]>(ROLES_KEY, INITIAL_ROLES);

  return roles;
};

export default useRoles;
