import useCrud from "../../../shared/hooks/useCrud";
import { showAlert } from "../../../shared/helpers/alert";
import useAuth from "../../auth/hooks/useAuth";
import { INITIAL_USERS, USERS_KEY } from "../../users/hooks/useUser";
import { User, UserFormData } from "../../users/types/User.types";

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  gender: string;
  password: string;
}

const emptyForm: ProfileFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  gender: "",
  password: "",
};

const useProfile = () => {
  const { __session, __role, __updateSession } = useAuth();
  const { __items, __isLoading, __handleUpdate } = useCrud<User>(
    USERS_KEY,
    INITIAL_USERS,
  );

  const currentUser =
    __items.find((user) => user.email === __session?.email) ?? null;

  const _updateProfile = async (data: ProfileFormData) => {
    if (!currentUser) return;

    const updated: UserFormData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      birthday: data.birthday,
      gender: data.gender,
      role: currentUser.role,
      password: data.password ? data.password : currentUser.password,
    };

    await __handleUpdate(currentUser.id, updated);

    __updateSession({
      email: updated.email,
      name: updated.name,
      role: updated.role,
    });

    showAlert("Profile updated successfully.");
  };

  const formInitialValues: ProfileFormData = currentUser
    ? {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        birthday: currentUser.birthday,
        gender: currentUser.gender,
        password: "",
      }
    : emptyForm;

  return {
    __currentUser: currentUser,
    __roleLabel: __role?.name ?? "",
    __isLoading,

    __formInitialValues: formInitialValues,
    __updateProfile: _updateProfile,
  };
};

export default useProfile;
