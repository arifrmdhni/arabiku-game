import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "Auth tidak tersedia tanpa database" }, { status: 503 })
}

export async function POST() {
  return NextResponse.json({ error: "Auth tidak tersedia tanpa database" }, { status: 503 })
}
