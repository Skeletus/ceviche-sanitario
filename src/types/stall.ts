export type StallStatus =
  | "pending"
  | "authorized"
  | "observed"
  | "suspended"
  | "closed";

export type Stall = {
  id: string;
  vendor_id: string;
  name: string;
  location_reference: string;
  district: string;
  sanitary_status: StallStatus;
  is_public: boolean;
  created_at?: string;
  updated_at?: string;
};

export type StallRegistrationInput = {
  vendor_id: string;
  name: string;
  location_reference: string;
  district: string;
};
