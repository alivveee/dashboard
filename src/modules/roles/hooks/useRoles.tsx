import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { INITIAL_ROLES, ROLES_KEY } from "./useRole";
import { Role } from "../types/Role.types";

const useRoles = (): Role[] => {
  const [roles] = useLocalStorage<Role[]>(ROLES_KEY, INITIAL_ROLES);

  return roles;
};

export default useRoles;
