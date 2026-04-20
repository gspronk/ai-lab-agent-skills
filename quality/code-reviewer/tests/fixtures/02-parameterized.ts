// TEST FIXTURE 02 — safe parameterized queries
// Expected: NO SQL injection finding (false positive check)

import { db } from './db'

export async function findUserByUsername(username: string) {
  const result = await db.query(
    'SELECT id, email, role FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0] ?? null
}

export async function getUserById(id: number) {
  return db.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true },
  })
}

export async function searchUsers(email: string, role: string) {
  return db.user.findMany({
    where: { email, role },
  })
}
