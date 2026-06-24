import { getSupabaseClient } from "@/lib/auth";
import type { Vendor, VendorRegistrationInput } from "@/types/vendor";

const VENDOR_FIELDS =
  "id, profile_id, document_number, phone, address, created_at, updated_at";

export async function getVendorByProfileId(
  profileId: string
): Promise<Vendor | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("vendors")
    .select(VENDOR_FIELDS)
    .eq("profile_id", profileId)
    .maybeSingle<Vendor>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createVendor(
  input: VendorRegistrationInput
): Promise<Vendor> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("vendors")
    .insert({
      profile_id: input.profile_id,
      document_number: input.document_number.trim(),
      phone: input.phone.trim(),
      address: input.address.trim()
    })
    .select(VENDOR_FIELDS)
    .single<Vendor>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
