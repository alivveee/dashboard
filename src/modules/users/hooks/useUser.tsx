import useClientManager from "../../client/hooks/useClientManager";
import { User } from "../types/User.types";

export const USERS_KEY = "gx-users";

export const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "Super Admin",
    role: "1",
    email: "superadmin@example.com",
    address: "Jl. Merdeka No. 1, Denpasar",
    birthday: "1990-01-01",
    gender: "L",
    password: "admin123",
  },
  {
    id: "2",
    name: "Admin",
    role: "2",
    email: "admin@example.com",
    address: "Jl. Sudirman No. 2, Denpasar",
    birthday: "1992-02-02",
    gender: "P",
    password: "admin123",
  },
  {
    id: "3",
    name: "User 1",
    role: "3",
    email: "user1@example.com",
    address: "Jl. Thamrin No. 3, Denpasar",
    birthday: "1995-03-03",
    gender: "L",
    password: "user123",
  },
  {
    id: "4",
    name: "User 2",
    role: "3",
    email: "user2@example.com",
    address: "Jl. Gatot Subroto No. 4, Denpasar",
    birthday: "1996-04-04",
    gender: "P",
    password: "user123",
  },
  {
    id: "5",
    name: "User 3",
    role: "3",
    email: "user3@example.com",
    address: "Jl. Rasuna Said No. 5, Denpasar",
    birthday: "1997-05-05",
    gender: "L",
    password: "user123",
  },
];

const emptyForm: Omit<User, "id"> = {
  name: "",
  role: "",
  email: "",
  address: "",
  birthday: "",
  gender: "",
  password: "",
};

const useUser = () => {
  const manager = useClientManager<User>({
    clientLabel: "User",
    storageKey: USERS_KEY,
    initialItems: INITIAL_USERS,
    emptyFormData: emptyForm,
  });

  return { ...manager, users: manager.items };
};

export default useUser;
