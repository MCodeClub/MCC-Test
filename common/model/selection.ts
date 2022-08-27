import { z } from "zod"
import { Auditable, Id } from "./common"

const selectionModel = z.object({
    name: z.string().min(3),
    description: z.string().nullable(),
    budget: z.number().positive(),
    dueDate: z.date()
})

export type SelectionInput = z.infer<typeof selectionModel>
export type Selection = Id & Auditable & SelectionInput

// TODO: define selectionItemModel and SelectionItem type
const selectionItemModel = z.object({
    name: z.string().min(3),
    description: z.string().nullable(),
    imageUrl: z.string().min(8),
    price: z.number().positive(),
    selection: z.object({
        name: z.string().min(3),
        description: z.string().nullable(),
        budget: z.number().positive(),
        dueDate: z.date()
    }),
    selectionId: z.string()
})

export type SelectionItemInput = z.infer<typeof selectionItemModel>
export type SelectionItem = Id & Auditable & SelectionItemInput

export {
    selectionModel,
    selectionItemModel
}

