import type { StallStatus } from "@/types/stall";

export type LicenseStatus = "active" | "expired" | "revoked";

export type License = {
  id: string;
  stall_id: string;
  license_number: string;
  issued_at: string | null;
  expires_at: string;
  status: LicenseStatus;
  created_at?: string;
  updated_at?: string;
};

export type LicenseWithStall = License & {
  stalls: {
    id: string;
    vendor_id: string;
    name: string;
    sanitary_status: StallStatus;
  } | null;
};

export type LicenseSaveInput = {
  stall_id: string;
  license_number: string;
  issued_at: string | null;
  expires_at: string;
  status: LicenseStatus;
};
