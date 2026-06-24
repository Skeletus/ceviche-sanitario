import { getSupabaseClient } from "@/lib/auth";
import type {
  License,
  LicenseSaveInput,
  LicenseStatus,
  LicenseWithStall
} from "@/types/license";

const LICENSE_FIELDS =
  "id, stall_id, license_number, issued_at, expires_at, status, created_at, updated_at";

const LICENSE_WITH_STALL_FIELDS =
  "id, stall_id, license_number, issued_at, expires_at, status, created_at, updated_at, stalls!inner(id, vendor_id, name, sanitary_status)";

export const LICENSE_STATUSES: LicenseStatus[] = [
  "active",
  "expired",
  "revoked"
];

export const LICENSE_STATUS_LABELS: Record<LicenseStatus, string> = {
  active: "Activa",
  expired: "Vencida",
  revoked: "Revocada"
};

export async function getLicenseByStallId(
  stallId: string
): Promise<License | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("licenses")
    .select(LICENSE_FIELDS)
    .eq("stall_id", stallId)
    .maybeSingle<License>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLicensesByVendorId(
  vendorId: string
): Promise<LicenseWithStall[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("licenses")
    .select(LICENSE_WITH_STALL_FIELDS)
    .eq("stalls.vendor_id", vendorId)
    .order("updated_at", { ascending: false })
    .returns<LicenseWithStall[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function saveLicense(input: LicenseSaveInput): Promise<License> {
  const existingLicense = await getLicenseByStallId(input.stall_id);
  const payload = {
    stall_id: input.stall_id,
    license_number: input.license_number.trim(),
    issued_at: input.issued_at,
    expires_at: input.expires_at,
    status: input.status
  };
  const client = getSupabaseClient();

  if (existingLicense) {
    const { data, error } = await client
      .from("licenses")
      .update(payload)
      .eq("id", existingLicense.id)
      .select(LICENSE_FIELDS)
      .single<License>();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const { data, error } = await client
    .from("licenses")
    .insert(payload)
    .select(LICENSE_FIELDS)
    .single<License>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
