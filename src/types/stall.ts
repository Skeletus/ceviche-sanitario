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

export type PublicStallLicense = {
  id: string;
  license_number: string;
  issued_at: string | null;
  expires_at: string;
  status: "active" | "expired" | "revoked";
};

export type PublicStall = {
  id: string;
  name: string;
  location_reference: string;
  district: string;
  sanitary_status: StallStatus;
  is_public: boolean;
  updated_at?: string;
  licenses: PublicStallLicense[];
};
