import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const url = process.env.TURSO_DATABASE_URL || undefined;
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

  if (!url) {
    console.warn('[db] TURSO_DATABASE_URL is not set — using local SQLite file:local.db');
  }

  const client = createClient({
    url: url ?? 'file:local.db',
    authToken,
  });

  _db = drizzle(client, { schema });
  return _db;
}
