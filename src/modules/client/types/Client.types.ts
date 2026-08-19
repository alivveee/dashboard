export interface StatusOption<TStatus extends string = string> {
  value: TStatus;
  label: string;
  badgeClass: string;
}

export interface BaseClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageId: string;
}

export type ProspectStatus = "pending" | "completed";
export type CustomerStatus = "active" | "blocked";

export type Prospect = BaseClient & {
  status: ProspectStatus;
};

export type Customer = BaseClient & {
  status: CustomerStatus;
};

export type ProspectFormData = Omit<Prospect, "id">;
export type CustomerFormData = Omit<Customer, "id">;
