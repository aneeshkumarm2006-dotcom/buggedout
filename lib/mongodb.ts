import { MongoClient, type Db } from "mongodb";

/**
 * Cached MongoDB connection.
 *
 * Next.js hot-reloads modules in dev, which would otherwise open a new pool on
 * every change and exhaust connections. We stash the client promise on the
 * global object so it survives reloads and is reused across serverless
 * invocations in production.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "buggedout";

if (!uri) {
  // Thrown lazily below so the module can still be imported at build time.
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (see .env.example).",
    );
  }
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
