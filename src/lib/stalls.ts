import { getSupabaseClient } from "@/lib/auth";
import type { Stall, StallRegistrationInput } from "@/types/stall";

const STALL_FIELDS =
  "id, vendor_id, name, location_reference, district, sanitary_status, is_public, created_at, updated_at";

export const INITIAL_STALL_STATUS = "pending" as const;

export async function getStallsByVendorId(
  vendorId: string
): Promise<Stall[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stalls")
    .select(STALL_FIELDS)
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createStall(
  input: StallRegistrationInput
): Promise<Stall> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stalls")
    .insert({
      vendor_id: input.vendor_id,
      name: input.name.trim(),
      location_reference: input.location_reference.trim(),
      district: input.district.trim(),
      sanitary_status: INITIAL_STALL_STATUS,
      is_public: false
    })
    .select(STALL_FIELDS)
    .single<Stall>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
