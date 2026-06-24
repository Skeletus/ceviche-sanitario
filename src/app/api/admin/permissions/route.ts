import { NextRequest, NextResponse } from "next/server";
import { AuthError, getBearerToken, requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request.headers);
    const { profile } = await requireRole(["admin"], token);

    return NextResponse.json({
      message: `Operacion permitida para ${profile.full_name}.`,
      role: profile.role
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: error.status
        }
      );
    }

    return NextResponse.json(
      {
        message: "No se pudo validar el permiso."
      },
      {
        status: 500
      }
    );
  }
}
