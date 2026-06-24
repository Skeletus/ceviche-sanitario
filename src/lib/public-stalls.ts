import { getSupabaseClient } from "@/lib/auth";
import type { PublicStall, StallStatus } from "@/types/stall";

const PUBLIC_STALL_FIELDS =
  "id, name, location_reference, district, sanitary_status, is_public, updated_at, licenses(id, license_number, issued_at, expires_at, status)";

export const PUBLIC_STALL_STATUSES: StallStatus[] = ["authorized"];

export const STALL_STATUS_LABELS: Record<StallStatus, string> = {
  pending: "Pendiente",
  authorized: "Autorizado",
  observed: "Observado",
  suspended: "Suspendido",
  closed: "Cerrado"
};

export async function getPublicAuthorizedStalls(): Promise<PublicStall[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stalls")
    .select(PUBLIC_STALL_FIELDS)
    .eq("is_public", true)
    .eq("sanitary_status", "authorized")
    .order("updated_at", { ascending: false })
    .returns<PublicStall[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPublicStallById(
  stallId: string
): Promise<PublicStall | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stalls")
    .select(PUBLIC_STALL_FIELDS)
    .eq("id", stallId)
    .eq("is_public", true)
    .eq("sanitary_status", "authorized")
    .maybeSingle<PublicStall>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
