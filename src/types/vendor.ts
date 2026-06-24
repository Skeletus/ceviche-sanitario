export type Vendor = {
  id: string;
  profile_id: string;
  document_number: string;
  phone: string;
  address: string | null;
  created_at?: string;
  updated_at?: string;
};

export type VendorRegistrationInput = {
  profile_id: string;
  document_number: string;
  phone: string;
  address: string;
};
