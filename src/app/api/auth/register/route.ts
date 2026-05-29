import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ error: "Registrasi tidak tersedia tanpa database" }, { status: 503 })
}
