import { NextResponse } from "next/server"
import { words } from "@/data/words"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const limit = parseInt(searchParams.get("limit") || "10")
  const difficulty = searchParams.get("level")

  let filtered = [...words]

  if (category) filtered = filtered.filter((w) => w.categoryId === category)
  if (difficulty) filtered = filtered.filter((w) => w.difficulty === parseInt(difficulty))

  const shuffled = filtered.sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, limit)

  return NextResponse.json(selected)
}
