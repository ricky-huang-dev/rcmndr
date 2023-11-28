import * as zod from 'zod'

const friendSchema = zod.object({
  id: zod.string(),
  nickname: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
})

export type Friend = zod.infer<typeof friendSchema>
