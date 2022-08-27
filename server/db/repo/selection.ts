import { Selection, SelectionInput, selectionModel } from '../../../common/model/selection'
import { prisma } from '../client'

const findSelection = async (): Promise<Selection[]> => {
    return await prisma.selection.findMany({})
}

const getSelection = async (id: string): Promise<Selection | null> => {
    // TODO: return back selection items with selections
    return await prisma.selection.findUnique({ where: { id } })
}

const createSelection = async (input: SelectionInput): Promise<Selection> => {
    const data = selectionModel.parse(input)
    return await prisma.selection.create({
        data: {
            name: data.name,
            description: data.description,
            budget: data.budget,
            dueDate: data.dueDate
        }
    })
}

// TODO: implement function to add a new selectionItem to a selection

export {
    findSelection, getSelection, createSelection
}

