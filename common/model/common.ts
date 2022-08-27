import { z } from "zod"

const identifiable = z.object({
    id: z.string().cuid()
})

const auditable = z.object({
    createdAt: z.date(),
    updatedAt: z.date()
})


export type Id = z.infer<typeof identifiable>
export type Auditable = z.infer<typeof auditable>