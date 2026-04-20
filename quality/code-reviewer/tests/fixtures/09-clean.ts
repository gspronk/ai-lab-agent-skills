// TEST FIXTURE 09 — clean, well-written code
// Expected: ZERO CRITICAL or WARNING findings

import { db } from './db'
import { z } from 'zod'

const CreateUserSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export async function createUser(input: unknown) {
  const validated = CreateUserSchema.parse(input)

  const existing = await db.user.findUnique({
    where: { email: validated.email },
  })

  if (existing) {
    throw new Error('Email already registered')
  }

  return db.user.create({
    data: {
      username: validated.username,
      email: validated.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  })
}
