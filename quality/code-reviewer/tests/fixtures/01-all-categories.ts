// TEST FIXTURE 01 — one issue per review category
// Expected: SQL injection (Security), missing null check (Correctness),
//           N+1 query (Performance), magic number (Maintainability)

import { db } from './db'

// SECURITY: SQL injection via string interpolation
export async function findUser(username: string) {
  const result = await db.query(
    `SELECT * FROM users WHERE username = '${username}'`
  )
  return result.rows[0]
}

// CORRECTNESS: missing null/bounds check — throws if array is empty
export function getLastElement(items: string[]): string {
  return items[items.length - 1].trim()
}

// PERFORMANCE: N+1 query — one DB call per order inside a loop
export async function getOrdersWithCustomers() {
  const orders = await db.order.findMany()
  for (const order of orders) {
    order.customer = await db.customer.findUnique({
      where: { id: order.customerId },
    })
  }
  return orders
}

// MAINTAINABILITY: magic number — unclear what 1.2125 represents
export function applyTax(amount: number): number {
  return amount * 1.2125
}
