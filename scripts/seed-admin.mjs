import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';

const envFile = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
for (const line of envFile.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] ?? 'Admin';

if (!email || !password) {
  console.error('usage: node scripts/seed-admin.mjs <email> <password> [name]');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const hash = await bcrypt.hash(password, 12);
const id = 'c' + Math.random().toString(36).slice(2, 14) + Date.now().toString(36);

const result = await pool.query(
  `INSERT INTO "Admin" (id, email, password, name, role, "createdAt", "updatedAt")
   VALUES ($1, $2, $3, $4, 'admin', NOW(), NOW())
   ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, "updatedAt" = NOW()
   RETURNING id, email, name, role, "createdAt"`,
  [id, email, hash, name]
);

console.log('Admin upserted:', result.rows[0]);
await pool.end();
