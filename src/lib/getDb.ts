import clientPromise from "./mongodb";

export async function getDb(dbName = "job-tracker") {
  const client = await clientPromise;
  return client.db(dbName);
}