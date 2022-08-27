
import { SelectionInput } from "../common/model/selection";
import { createSelection } from "../server/db/repo/selection";

const seedSelection = async (count = 1) => {
    [...Array(count)].forEach(async (_, idx) => {
        await createSelection(newSelection(idx + 1));
    })
}

const newSelection = (idx: number): SelectionInput => {
    return {
        name: `Select ${idx}`,
        description: `Description of selection ${idx}`,
        dueDate: new Date(),
        budget: 100 * idx
    }
}

const main = async () => {
    await seedSelection(5);
}

main();

export { };
