"use client";

import { useParams } from "next/navigation";
import { StallDetail } from "@/components/stalls/StallDetail";

export default function PublicStallDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
      <section className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <StallDetail stallId={params.id} />
      </section>
    </main>
  );
}
