import { useCallback, useMemo } from "react";
import useCrud from "../../../shared/hooks/useCrud";
import { showAlert } from "../../../shared/helpers/alert";
import useAuth from "../../auth/hooks/useAuth";
import { INITIAL_USERS, USERS_KEY } from "../../users/hooks/useUser";
import { User } from "../../users/types/User.types";

export interface ProfileFormData {
  name: string;
  email: string;
  address: string;
  birthday: string;
  gender: string;
  password: string;
}

const emptyForm: ProfileFormData = {
  name: "",
  email: "",
  address: "",
  birthday: "",
  gender: "",
  password: "",
};

const useProfile = () => {
  const { session, role, updateSession } = useAuth();
  const {
    items: users,
    loading,
    update,
  } = useCrud<User>(USERS_KEY, INITIAL_USERS);

  const currentUser = useMemo(
    () => users.find((user) => user.email === session?.email) ?? null,
    [users, session],
  );

  const updateProfile = useCallback(
    async (data: ProfileFormData) => {
      if (!currentUser) return;

      const updated: Omit<User, "id"> = {
        name: data.name,
        email: data.email,
        address: data.address,
        birthday: data.birthday,
        gender: data.gender,
        role: currentUser.role,
        password: data.password ? data.password : currentUser.password,
      };

      await update(currentUser.id, updated);

      updateSession({
        email: updated.email,
        name: updated.name,
        role: updated.role,
      });

      showAlert("Profil berhasil diperbarui.");
    },
    [currentUser, update, updateSession],
  );

  const formInitialValues: ProfileFormData = currentUser
    ? {
        name: currentUser.name,
        email: currentUser.email,
        address: currentUser.address,
        birthday: currentUser.birthday,
        gender: currentUser.gender,
        password: "",
      }
    : emptyForm;

  return {
    currentUser,
    roleLabel: role?.name ?? "",
    loading,

    formInitialValues,
    updateProfile,
  };
};

export default useProfile;
