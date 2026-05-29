import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "Papan skor tidak tersedia tanpa database" }, { status: 503 })
}
