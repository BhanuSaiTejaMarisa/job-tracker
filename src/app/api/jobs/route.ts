import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/getDb";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);

  // Example filter: status
  const status = searchParams.get("status");
  const salary_gte = Number(searchParams.get("salary_gte"));
  const salary_lte = Number(searchParams.get("salary_lte"));

  const filter: any = {};
  if (status) filter.status = status;
  if (!isNaN(salary_gte))
    filter.salary = { ...filter.salary, $gte: salary_gte };
  if (!isNaN(salary_lte))
    filter.salary = { ...filter.salary, $lte: salary_lte };

  const jobs = await db.collection("jobs").find(filter).toArray();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const db = await getDb();
  const data = await req.json();
  const result = await db.collection("jobs").insertOne(data);
  return NextResponse.json(result.ops?.[0] || data, { status: 201 });
}
