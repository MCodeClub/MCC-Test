// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { findSelection, getSelection } from '../../../server/db/repo/selection';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const id = req.query.id
        if (id) {
            const selection = await getSelection(id[0])
            return res.status(200).json(selection);
        } else {
            const selections = await findSelection()
            return res.status(200).json(selections);
        }
    } else if (req.method === 'POST') {
        // TODO: implement selection creation
        return res.status(200).json({});
    } else {
        return res.status(501).end();
    }
}
